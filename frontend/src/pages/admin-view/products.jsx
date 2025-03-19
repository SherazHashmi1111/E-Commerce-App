import React, { Fragment, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../store/admin/products-slice/index";
import { toast } from "sonner";
import AdminProductTile from "../../components/admin-view/product-tile";

function AdminProducts() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProducts);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialAddProductState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (currentEditedId !== null) {
      dispatch(updateProduct({ id: currentEditedId, formData })).then(
        (data) => {
          if (data?.payload?.success) {
            dispatch(getAllProducts());
            setImageFile(null);
            setFormData(initialAddProductState);
            setOpenAddProductDialog(false);
            toast.success("Product Edited successfully");
          }
        }
      );
    } else {
      dispatch(
        createProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(getAllProducts());
          setImageFile(null);
          setFormData(initialAddProductState);
          setOpenAddProductDialog(false);
          toast.success("Product Created successfully");
        }
      });
    }
  };
  const allProducts = products.data;

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };
  
  
  

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenAddProductDialog(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {allProducts && allProducts.length > 0
          ? allProducts.map((product) => (
              <AdminProductTile
                product={product}
                setCurrentEditedId={setCurrentEditedId}
                setOpenAddProductDialog={setOpenAddProductDialog}
                setFormData={setFormData}
                key={product._id}
              />
            ))
          : null}
        <Sheet
          open={openAddProductDialog}
          onOpenChange={() => {
            setOpenAddProductDialog(false);
            setCurrentEditedId(null);
            setFormData(initialAddProductState);
          }}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {currentEditedId !== null ? "Edit Product" : "Add new Product"}
              </SheetTitle>
              <SheetDescription>
                {currentEditedId !== null
                  ? "Edit this Product as you want"
                  : "Add new Product In Stock"}
              </SheetDescription>
            </SheetHeader>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              uploadedImageUrl={uploadedImageUrl}
              isEditMode={currentEditedId !== null}
            />
            <div className="py-6 mx-6">
              <CommonForm
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                onSubmit={onSubmit}
                isButtonDisabled= {!isFormValid()}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}

export default AdminProducts;
