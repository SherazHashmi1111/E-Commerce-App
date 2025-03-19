import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from '../ui/skeleton'

function ProductImageUpload({
  imageFile,
  setImageFile,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  uploadedImageUrl,
  isEditMode
}) {
  const inputImageRef = useRef(null);
  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };
  const handleRemoveImage = (event) => {
    event.preventDefault();
    setImageFile(null);
    if (inputImageRef.current) {
      inputImageRef.current.value = "";
    }
  };
  async function uploadedImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );

    if (response) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }
  useEffect(() => {
    if (imageFile !== null) {
      uploadedImageToCloudinary();
    }
  }, [imageFile]);
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const dropedFile = event.dataTransfer.files?.[0];
    if (dropedFile) setImageFile(dropedFile);
  };
  return (
    <div className=" max-w-md mx-6">
      <label htmlFor="" className="taxt-lg font-semibold mb-2 block">
        Upload Image
      </label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? 'opacity-50' : ''} border-2 border-dashed p-4 rounded-lg`}
        onClick={() => inputImageRef.current?.click()}
      >
        <Input
          type="file"
          id="image-upload"
          className="hidden"
          ref={inputImageRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-uploaded"
            className={`${isEditMode ? 'cursor-not-allowed' : ''} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="">Drag & drop or click to upload image</span>
          </Label>
        ) : (
          imageLoadingState ? <Skeleton className='h-10 bg-gray-100'/> :
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <img src={uploadedImageUrl ? uploadedImageUrl : null} alt="img" className="w-20"/>
            </div>
            <p className="text-sm font-medium ml-2">{imageFile.name.slice(0, 20)}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
