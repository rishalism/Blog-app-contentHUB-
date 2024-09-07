import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";
import { useFormik } from "formik";
import { IPost } from "../interface/PostInterface";
import { NewPostSchema } from "../validations/FormValidations";
import { CreateBlog } from "../api/UserApi";
import toast from "react-hot-toast";
import { useState } from "react";


function PostModal({ isOpen, onClose, setIsuploaded }: any) {
    const [image, setImage] = useState<File | undefined>(undefined);

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, isSubmitting } = useFormik<IPost>({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: NewPostSchema,
        onSubmit: async (values) => {
            console.log(image);
            if (image) {

                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('image', image);
                onClose();
                const response = await CreateBlog(formData)
                if (response) {
                    setIsuploaded((prev: boolean) => !prev)
                    toast.success('post uploaded !')
                }
            } else {
                toast.error('image is required')
            }
        }
    })


    return (
        <Modal backdrop={'opaque'} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">New Post</ModalHeader>
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

export default PostModal
