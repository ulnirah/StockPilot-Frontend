import {
    Typography,
    Button,
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
  } from "@material-tailwind/react";


function ViewImageProduct({openViewImage, handleClose, imageURL}){
    
    return(
        
      <Dialog size="sm" open={openViewImage} className="p-4">
        <DialogHeader className="relative m-0 block">
            <Typography variant="h4" color="blue-gray">
            Product Image
            </Typography>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
        <img
            alt="nature"
            className="h-full w-full object-cover object-center"
            src={imageURL}
        />
        </DialogBody>
        <DialogFooter className="flex justify-center">
            <Button variant="outlined"  onClick={handleClose} fullWidth >
            Close
            </Button>
        </DialogFooter>
      </Dialog>

    )
}

export default ViewImageProduct;

