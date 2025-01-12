import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import Layout from "./app/layout";
import "./index.css"
 
export default function App() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote();
 
  // Renders the editor instance using a React component.
  return(
    <Layout>
    <BlockNoteView editor={editor} />
    </Layout>
  ) ;
}
 