import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";
import { useFormik } from "formik";
import { IPost } from "../interface/PostInterface";
import { NewPostSchema } from "../validations/FormValidations";
import { useState } from "react";
import { UpdateBlog } from "../api/UserApi";
import toast from "react-hot-toast";

function EditPostModal({ isOpen, onClose, _id, setIsEdited, title, description }: any) {
    const [image, setImage] = useState<File | undefined>(undefined);



    const { values, handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting } = useFormik<IPost>({
        initialValues: {
            title: title,
            description: description,
        },
        validationSchema: NewPostSchema,
        onSubmit: async (values) => {
            if (image) {

                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('image', image);
                formData.append('_id', _id)
                onClose();
                const response = await UpdateBlog(formData)
                if (response) {
                    toast.success('succesfully edited !')
                    setIsEdited((prev: any) => !prev)
                }
            } else {
                toast.error('image is required')
            }

        }
    })



    return (
        <Modal backdrop={'opaque'} isOpen={isOpen} onClose={onClose} >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Post</ModalHeader>
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Title"
                                    placeholder="Enter a Title for the blog"
                                    variant="bordered"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                    id="title"
                                    name="title"
                                />
                                {errors.title && touched.title && <p className="text-xs text-red-500">{errors.title}</p>}

                                <Textarea
                                    label="description"
                                    placeholder="Enter your description"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    id="description"
                                    name="description"
                                    variant="bordered"
                                />
                                {errors.description && touched.description && <p className="text-xs text-red-500">{errors.description}</p>}


                                <label htmlFor="image">Add a cover image</label>
                                <input
                                    type="file"
                                    autoFocus
                                    onChange={(e) => {
                                        const files = e.target.files;
                                        if (files && files.length > 0) {
                                            setImage(files[0]);
                                        } else {
                                            setImage(undefined);
                                        }
                                    }}
                                    id="image"
                                    name="image"
                                />
                                {errors.image && touched.image && <p className="text-xs text-red-500">{errors.image}</p>}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button isLoading={isSubmitting} type="submit" color="primary" >
                                    Save
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}

export default EditPostModal
