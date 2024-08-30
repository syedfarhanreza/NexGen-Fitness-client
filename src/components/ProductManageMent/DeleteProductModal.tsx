import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AlertIcon from "@/icons/AlertIcon";
import { useDeleteProductByIdMutation } from "@/redux/features/product/product.api";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";

const DeleteProductModal = ({ productId }: { productId: string }) => {
  const [deleteProduct] = useDeleteProductByIdMutation();
  const handleSubmit = async () => {
    const modalCloseBtn = document.getElementById(
      "delete-modal-close"
    ) as HTMLElement;

    const toastId = toast.loading("Please wait...");
    try {
      const { data } = await deleteProduct(productId);
      if (!data) {
        return toast.error("An unkown error occurd");
      }
      if (!data.success) {
        return toast.error(data.message || "Failed to delete product");
      }
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
    modalCloseBtn.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <AlertIcon className="size-12 text-red-500" />
          <div className="space-y-2 text-center">
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              selected item.
            </DialogDescription>
          </div>
        </div>
        <DialogFooter>
          <div>
            <DialogClose asChild>
              <Button variant="outline" id="delete-modal-close">
                Cancel
              </Button>
            </DialogClose>
          </div>
          <Button variant="destructive" onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteProductModal;
