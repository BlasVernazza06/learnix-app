import { createClient } from "@/utils/supabase/server"
import HeaderStart from "@/app/ui/headerstart"

export default async function HomeLayout({ children }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser() // Obtener el usuario aquí

  return (
    <>
      <HeaderStart user={user} />
      {children}
    </>
  );
} 