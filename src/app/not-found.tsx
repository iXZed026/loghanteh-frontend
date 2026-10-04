import ErrorPage from "@/components/errors/ErrorPage";
import "@/app/globals.css"

function NotFound() {
  return <ErrorPage
    statusCode={404}
    message="Oops! The page you’re looking for couldn’t be found."
  />;
}

export default NotFound