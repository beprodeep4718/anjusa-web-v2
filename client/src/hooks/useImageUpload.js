import { useState } from 'react'

const useImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Convert image file to base64 with compression
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          // Calculate new dimensions (max width/height: 1200px)
          const maxSize = 1200
          let { width, height } = img
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width
              width = maxSize
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height
              height = maxSize
            }
          }
          
          canvas.width = width
          canvas.height = height
          
          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8) // 80% quality
          resolve(compressedBase64)
        }
        img.src = reader.result
      }
      reader.onerror = (error) => reject(error)
    })
  }

  // Handle image file selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }
      
      // Validate file size (max 10MB for original file)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB')
        return
      }

      try {
        // Show loading state
        setImagePreview('loading')
        
        const base64Image = await convertToBase64(file)
        
        // Check compressed size (base64 is ~1.37x larger than binary)
        const sizeInMB = (base64Image.length * 0.75) / (1024 * 1024)
        if (sizeInMB > 5) {
          alert('Compressed image is still too large. Please choose a smaller image.')
          setImagePreview(null)
          return
        }
        
        setSelectedImage(base64Image)
        setImagePreview(URL.createObjectURL(file))
      } catch (error) {
        console.error('Error converting image:', error)
        alert('Error processing image. Please try again.')
        setImagePreview(null)
      }
    }
  }

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    // Reset file input
    const fileInput = document.getElementById('image-upload') || document.getElementById('image-upload-edit')
    if (fileInput) fileInput.value = ''
  }

  return {
    selectedImage,
    imagePreview,
    setSelectedImage,
    setImagePreview,
    handleImageChange,
    removeImage
  }
}

export default useImageUpload
