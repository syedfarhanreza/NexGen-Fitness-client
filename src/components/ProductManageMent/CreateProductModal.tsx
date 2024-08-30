import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UploadIcon from "@/icons/UploadIcon";
import { useCreateProductMutation } from "@/redux/features/product/product.api";
import { uploadImg } from "@/utils/imageUpload";
import { FormikHelpers, FormikValues, useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  title: "",
  category: "",
  stock: "",
  tag: "",
  details: "",
  price: "",
  image: null,
};
type TFormValues = {
  title: string;
  category: string;
  stock: string;
  tag: string;
  details: string;
  price: string;
  image: File | null;
};
const validationSchema = Yup.object({
  title: Yup.string().required("Product name is required"),
  category: Yup.string().required("Product category is required"),
  stock: Yup.number()
    .required("Product stock is required")
    .min(0, "Stock must be greater than or equal to 0"),
  tag: Yup.string(),
  details: Yup.string().required("Product details are required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),
  image: Yup.mixed().required("Image is required"),
});

const CreateProductModal = () => {
  const [createProduct] = useCreateProductMutation();

  const handelSubmit = async (
    values: TFormValues,
    { resetForm }: FormikHelpers<FormikValues>
  ) => {
    const modalCloseBtn = document.getElementById(
      "create-modal-close"
    ) as HTMLElement;

    console.log(values);
    const toastId = toast.loading("Please wait...");

    try {
      const { display_url } = await uploadImg(values.image as File);

      const payload = { ...values, image: display_url || "/images/bad.jpg" };

      const { data } = await createProduct(payload);
      if (!data) {
        return toast.error("An unknown error occurred");
      }
      if (!data.success) {
        return toast.error(data.message || "Failed to create product");
      }
      toast.success("Product created successfully");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
      resetForm && resetForm();
    }
    modalCloseBtn.click();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (val, option) =>
      handelSubmit(val, option as FormikHelpers<FormikValues>),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Product</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[600px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Fill out the form to add a new product to the inventory.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="grid gap-6 py-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Product Name *</Label>
            <Input
              id="title"
              name="title"
              placeholder="Product Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="category">Product Category *</Label>
              <Input
                id="category"
                name="category"
                placeholder="Product category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              />
              {formik.touched.category && formik.errors.category ? (
                <div className="text-red-500">{formik.errors.category}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Product in Stock *</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                placeholder="Product stock"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
              />
              {formik.touched.stock && formik.errors.stock ? (
                <div className="text-red-500">{formik.errors.stock}</div>
              ) : null}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tag">Product tag (optional)</Label>
            <Input
              id="tag"
              name="tag"
              placeholder="Product tag"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tag}
            />
            {formik.touched.tag && formik.errors.tag ? (
              <div className="text-red-500">{formik.errors.tag}</div>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="details">Product Details *</Label>
            <Textarea
              id="details"
              name="details"
              placeholder="Product details"
              className="min-h-[120px]"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
            />
            {formik.touched.details && formik.errors.details ? (
              <div className="text-red-500">{formik.errors.details}</div>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="$0.00"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="text-red-500">{formik.errors.price}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      formik.setFieldValue("image", file);
                    }
                  }}
                />
                <label
                  htmlFor="image"
                  className="p-[10px] border-[1px] border-borderColor rounded-[8px]"
                >
                  <UploadIcon className="h-4 w-4" />
                </label>
              </div>
              {formik.touched.image && formik.errors.image ? (
                <div className="text-red-500">{formik.errors.image}</div>
              ) : null}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" id="create-modal-close">
                Cancel
              </Button>
            </DialogClose>
            <Button className="bg-primaryMat text-white" type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
