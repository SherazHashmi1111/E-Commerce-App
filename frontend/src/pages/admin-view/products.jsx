import React, { Fragment, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CommonForm from "../../components/common/form";
import { addProductFormElements, initialAddProductState } from "../../config";
import ProductImageUpload from "../../components/admin-view/image-upload";

function AdminProducts() {
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialAddProductState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  console.log(uploadedImageUrl, imageLoadingState);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenAddProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openAddProductDialog}
          onOpenChange={() => {
            setOpenAddProductDialog(false);
          }}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add new Product</SheetTitle>
              <SheetDescription>Add new Product In Stock</SheetDescription>
            </SheetHeader>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
            />
            <div className="py-6 mx-6">
              <CommonForm
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                buttonText="Add"
                onSubmit={onSubmit}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}

export default AdminProducts;
