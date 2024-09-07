import { Button, Card, CardBody, CardHeader, useDisclosure } from "@nextui-org/react"
import Post from "../components/Post"
import { User } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import PostModal from "../components/PostModal";
import { useEffect, useState } from "react";
import { GetBLOG } from "../api/UserApi";
import { IPost } from "../interface/PostInterface";

function FeedPage() {

  const { UserInfo } = useSelector((state: RootState) => state.user)
  const [feeds, setFeeds] = useState<IPost[]>([])

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [uploaded, setIsuploaded] = useState(false)
  const [isDeleted, setisDeleted] = useState(false)
  const [isEdited, setIsEdited] = useState(false)

  const FetchAllPosts = async () => {
    const response = await GetBLOG()
    setFeeds(response?.data)
  }

  useEffect(() => {
    FetchAllPosts()
  }, [uploaded, isDeleted, isEdited])

  return (
    <>
      <div className=" flex  items-center flex-2 justify-between gap-5 flex-row px-4">
        <div className="max-h-svh hide-scrollbar overflow-y-auto overflow-x-hidden gap-6 p-3  w-full flex flex-col">
          {
            feeds?.map((posts) => {
              return (
                <Post title={posts.title} key={posts._id} description={posts.description} image={posts.image} _id={posts._id} UserName={UserInfo?.name} setisDeleted={setisDeleted} setIsEdited={setIsEdited} />
              )
            })
          }
        </div>
        <div className="h-screen py-4 w-1/4 justify-start  flex flex-col">
          <Card>
            <CardHeader>
              <User
                name={`${UserInfo?.name}`}
                description={`${UserInfo?.email}`}
                avatarProps={{
                  src: UserInfo?.avatar
                }}
              />
            </CardHeader>
            <CardBody>
              <Button onPress={onOpen}>New post</Button>
            </CardBody>
          </Card>
        </div>
      </div>
      <PostModal isOpen={isOpen} onClose={onClose} setIsuploaded={setIsuploaded} />
    </>
  )
}

export default FeedPage
