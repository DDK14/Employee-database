import { auth } from "@/auth.config"

export default async function UserInfo(){
  
const session = await auth()
  if(session?.user){
    return(
      <div>
        {" "}
        <h1>NextAUTH</h1>
        <p>User signed in with name: {session.user.name}</p>
        <p>User signed in with email: {session.user.email}</p>
      </div>
    )
  }}