import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-20 mt-10 items-center justify-center px-4"
      >
        <div className="max-w-4xl flex flex-col gap-10 mt-20 items-center text-center min-h-60 ">
          <h2 className="text-7xl">"Unleash Your Thoughts, One Post at a Time!"</h2>
          <div className="flex gap-3">
            <Button as={Link} to={'/auth/signup'} variant="ghost">Sign up</Button>
            <Button color="secondary" as={Link} to={'/auth/signup'} className="text-white" >start posting !</Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LandingPage
