import { useCurrentUser } from "@/features/auth/hooks/useAuth"


function VerifySession() {

    useCurrentUser()

    return null
}

export default VerifySession