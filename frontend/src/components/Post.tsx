import { Card, CardHeader, CardBody, Image, useDisclosure } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { DeleteBLOG } from "../api/UserApi";
import toast from "react-hot-toast";
import EditPostModal from "./EditPostModal";


interface props {
    _id?: string,
    title: string,
    description: string,
    image?: any,
    UserName: string | undefined,
    setisDeleted: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEdited: React.Dispatch<React.SetStateAction<boolean>>,
}



function Post({ title, description, image, UserName, _id, setisDeleted, setIsEdited }: props) {

    const { isOpen, onClose, onOpen } = useDisclosure();


    async function HandleDelete() {
        if (_id) {
            const response = await DeleteBLOG(_id)
            if (response) {
                toast.success('Post has been successFully Deleted')
                setisDeleted((prev: boolean) => !prev)
            }
        }
    }

    return (
        <>
            <Card className="py-4 w-full bg-white shadow-lg min-h-80">
                <CardHeader className="pb-0 relative pt-2 px-4 flex-col items-start">
                    <Dropdown>
                        <DropdownTrigger>
                            <div className="absolute cursor-pointer right-2">
                                <HiOutlineDotsVertical />
                            </div>
                        </DropdownTrigger>

                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem onClick={onOpen} key="edit">Edit file</DropdownItem>
                            <DropdownItem onClick={HandleDelete} key="delete" className="text-danger" color="danger"> Delete file</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <h4 className="font-bold text-large">{title}</h4>
                    <span>- {UserName}</span>
                </CardHeader>
                <CardBody className="w-full flex flex-row max-h-80 overflow-hidden py-2">
                    <div className="w-1/2">
                        <Image
                            alt="Card background"
                            className="object-cover aspect-square  max-h-64 rounded-xl"
                            src={`http://localhost:3000/images/${image}`}
                        />
                    </div>
                    <div className="w-1/2 overflow-auto max-h-64">
                        <p className="pr-4">
                            {description}
                        </p>
                    </div>
                </CardBody>
            </Card>
            <EditPostModal title={title} description={description} isOpen={isOpen} onClose={onClose} _id={_id} setIsEdited={setIsEdited} />
        </>
    );
}

export default Post;
