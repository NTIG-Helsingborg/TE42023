# Load System.Drawing assembly to get image dimensions
Add-Type -AssemblyName System.Drawing

# Function to get image dimensions and orientation
function Get-ImageDetails($imagePath) {
    $image = [System.Drawing.Image]::FromFile($imagePath)
    $width = $image.Width
    $height = $image.Height

    $orientationValues = 'Unknown', 'Normal', 'FlipHorizontal', 'Rotate180', 'FlipVertical', 'Transpose', 'Rotate270', 'Transverse', 'Rotate90'
    $orientation = 'Normal'
    try {
        $orientationValue = $image.GetPropertyItem(274).Value[0]
        $orientation = $orientationValues[$orientationValue]
    } catch {
        $orientation = 'Unknown'
    }

    return @{Image=$image; Width=$width; Height=$height; Orientation=$orientation}
}

# Function to rotate image based on orientation
function Rotate-Image($image, $orientation) {
    switch ($orientation) {
        'Rotate270' { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
        'Rotate180' { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
        'Rotate90' { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
        'FlipHorizontal' { $image.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX) }
        'FlipVertical' { $image.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipY) }
        'Transpose' { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipX) }
        'Transverse' { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipY) }
    }
    return $image
}

# Directory containing images
$imagesPath = "C:\Users\eduard.mihic\Documents\TE42023_2024\assets\Rotationbilder\*.jpg"

# Check if the directory exists
$directoryPath = [System.IO.Path]::GetDirectoryName($imagesPath)
if (-not (Test-Path $directoryPath)) {
    Write-Host "Directory does not exist: $directoryPath"
    exit
}

# Loop through each image in the directory
foreach ($imageFile in Get-ChildItem $imagesPath) {
    if (-not (Test-Path $imageFile)) {
        continue
    }

    # Get image details (dimensions and orientation)
    $details = Get-ImageDetails $imageFile.FullName
    $image = $details.Image
    $width = $details.Width
    $height = $details.Height
    $orientation = $details.Orientation

    echo "Processing $imageFile with orientation $orientation"

    # Rotate the image if needed
    $rotatedImage = Rotate-Image $image $orientation

    # Save the rotated image temporarily
    $tempPath = [System.IO.Path]::GetTempFileName()
    $rotatedImage.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $rotatedImage.Dispose()
    
    # Get the dimensions of the rotated image
    $newSize = Get-ImageDetails $tempPath
    $newWidth = $newSize.Width
    $newHeight = $newSize.Height

    # Determine if width is greater than height
    if ($newWidth -gt $newHeight) {
        if ($newWidth -gt 1000) {
            echo 1
            & .\cwebp.exe -metadata all -preset photo -resize 1000 0 -mt $tempPath -o ($imageFile.DirectoryName + "\..\new\" + [System.IO.Path]::GetFileNameWithoutExtension($imageFile) + ".webp")
        } else {
            echo 2
            & .\cwebp.exe -metadata all -preset photo -mt $tempPath -o ($imageFile.DirectoryName + "\..\new\" + [System.IO.Path]::GetFileNameWithoutExtension($imageFile) + ".webp")
        }
    } else {
        if ($newHeight -gt 1000) {
            echo 3
            & .\cwebp.exe -metadata all -preset photo -resize 0 1000 -mt $tempPath -o ($imageFile.DirectoryName + "\..\new\" + [System.IO.Path]::GetFileNameWithoutExtension($imageFile) + ".webp")
        } else {
            echo 4
            & .\cwebp.exe -metadata all -preset photo -mt $tempPath -o ($imageFile.DirectoryName + "\..\new\" + [System.IO.Path]::GetFileNameWithoutExtension($imageFile) + ".webp")
        }
    }

    # Delete the temporary file
    Remove-Item $tempPath
}
