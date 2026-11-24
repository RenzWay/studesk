package com.renz.studesk.core.img

import android.content.Context
import android.graphics.Bitmap
import android.graphics.ImageDecoder
import android.net.Uri
import android.util.Base64
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.ByteArrayOutputStream
import kotlin.math.max
import kotlin.math.roundToInt

class ImageTooLargeException : Exception("Image is still too large after compression")

object ImageCompressor {
    private const val MIN_QUALITY = 30
    private const val QUALITY_STEP = 10

    /**
     * Padanan compressImageToBase64() di web: kecilkan (rasio dijaga) -> WebP -> Base64 data URL.
     * Bedanya: kualitas diturunkan otomatis sampai hasil <= [maxBytes] (ukuran sebelum Base64).
     *
     * @throws ImageTooLargeException kalau di kualitas minimum pun masih lebih besar dari [maxBytes].
     */
    suspend fun compressToDataUrl(
        context: Context,
        uri: Uri,
        maxSide: Int = 800,
        startQuality: Int = 70,
        maxBytes: Int = 400 * 1024,
    ): String = withContext(Dispatchers.Default) {
        // ImageDecoder otomatis memutar gambar sesuai EXIF dan mengecilkan saat decode (hemat memori).
        val source = ImageDecoder.createSource(context.contentResolver, uri)
        val bitmap = ImageDecoder.decodeBitmap(source) { decoder, info, _ ->
            val longest = max(info.size.width, info.size.height)
            if (longest > maxSide) {
                val scale = maxSide.toFloat() / longest
                decoder.setTargetSize(
                    (info.size.width * scale).roundToInt(),
                    (info.size.height * scale).roundToInt(),
                )
            }
            decoder.allocator = ImageDecoder.ALLOCATOR_SOFTWARE
        }

        try {
            var quality = startQuality
            while (true) {
                val out = ByteArrayOutputStream()
                bitmap.compress(Bitmap.CompressFormat.WEBP_LOSSY, quality, out)
                val bytes = out.toByteArray()

                if (bytes.size <= maxBytes) {
                    return@withContext "data:image/webp;base64," +
                            Base64.encodeToString(bytes, Base64.NO_WRAP)
                }
                if (quality <= MIN_QUALITY) throw ImageTooLargeException()
                quality -= QUALITY_STEP
            }
            @Suppress("UNREACHABLE_CODE")
            error("unreachable")
        } finally {
            bitmap.recycle()
        }
    }
}