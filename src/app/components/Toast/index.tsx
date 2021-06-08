import { createStandaloneToast } from "@chakra-ui/react"

const toast = createStandaloneToast()

export default function doToast(title, description, status) {
    toast({
        position: "bottom-right",
        title: title,
        description: description,
        status: status,
        duration: 5000,
        isClosable: true,
      })
}