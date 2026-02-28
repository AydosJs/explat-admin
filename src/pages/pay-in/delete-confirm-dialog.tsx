import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  onConfirm: () => void;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  selectedCount,
  onConfirm,
}: DeleteConfirmDialogProps) {
  const { t } = useTranslation();

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center sm:place-items-center sm:text-center">
          <AlertDialogTitle className="w-full text-center text-xl sm:text-center">
            {t("payIn.deleteConfirmTitle")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {t("payIn.deleteConfirmDescription", { count: selectedCount })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full gap-2 sm:flex-row">
          <AlertDialogCancel className="w-1/2">
            {t("payIn.deleteConfirmCancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            className="w-1/2"
            onClick={handleConfirm}
          >
            {t("payIn.deleteConfirmAction")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
