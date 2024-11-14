import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    Tooltip,
    Input,
    Option,
    Select,
    Dialog,
    Textarea,
    IconButton,
    DialogBody,
    DialogHeader,
    DialogFooter,
  } from "@material-tailwind/react";
import { useState, useEffect } from "react";


function CategoryDialog({open, handleClose, handleAdd }){

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const [formData, setFormData] = useState({
        name: '',
      });

    return(
    <>
        <Dialog size="sm" open={open} className="p-4">
            <form onSubmit={() => console.log('enter') }>
                <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blue-gray">
                    Create New Category
                </Typography>
                <Typography className="mt-8 font-normal text-orange-600">
                    *Required
                </Typography>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6">
                <div>
                    <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                    >
                    Category Name
                    </Typography>
                    <Input
                    color="gray"
                    size="lg"
                    onChange={handleChange}
                    placeholder="Input category name"
                    name="name"
                    className="placeholder:opacity-100 focus:!border-t-gray-900"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                    />
                </div>
                </DialogBody>
                <DialogFooter className="flex justify-center">
                <Button variant="outlined" onClick={handleClose} >
                    Cancel
                </Button>
                <Button className="ml-8 " onClick={() => handleAdd(formData)}>
                    Add Category
                </Button>
                </DialogFooter>
            </form>
        </Dialog>
    </>
    )
}

export default CategoryDialog;