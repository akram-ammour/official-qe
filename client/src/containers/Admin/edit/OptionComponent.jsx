import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React, { useEffect, useState } from 'react'

const OptionComponent = ({id,onChange}) => {


            
const CustomDocument = Document.extend({
    content: 'taskList',
})
  
const CustomTaskItem = TaskItem.extend({
  content: 'inline*',
})

const editor = useEditor({
  extensions: [
    CustomDocument,
    Paragraph,
    Text,
    TaskList,
    CustomTaskItem,
  ],
  content :  `
  <ul data-type="taskList">
    <li data-type="taskItem" data-checked=false></li>
  </ul>`,
  onUpdate: ({editor}) =>{
    onChange(id,editor.getJSON())
  }
})

  return (
    <EditorContent editor={editor} />
  )
}

export default OptionComponent

// import Document from '@tiptap/extension-document'
// import Paragraph from '@tiptap/extension-paragraph'
// import TaskItem from '@tiptap/extension-task-item'
// import TaskList from '@tiptap/extension-task-list'
// import Placeholder from '@tiptap/extension-placeholder'
// import Text from '@tiptap/extension-text'
// import { EditorContent, useEditor } from '@tiptap/react'
// import React, { useEffect, useState } from 'react'

// const OptionComponent = ({id,onChange,initialValue=[{
//   Choice: "",
//   Value: false
// }]}) => {

//   const [content, setContent] = useState(""); // Removed the initial value
//       useEffect(() => {
//         const inputs = `
//           <ul data-type="taskList">
//             ${initialValue
//               .map(
//                 (choice) =>
//                   `<li data-type="taskItem" data-checked=${choice.Value}>${choice.Choice}</li>`
//               )
//               .join("")}
//           </ul>`;
//         setContent(inputs);
//       }, [initialValue]);

//       // useEffect(()=>{
//       //   console.log(content)
//       // },[content])
            
// const CustomDocument = Document.extend({
//     content: 'taskList',
// })
  
// const CustomTaskItem = TaskItem.extend({
//   content: 'inline*',
// })

// const editor = useEditor({
//   extensions: [
//     CustomDocument,
//     Paragraph,
//     Text,
//     TaskList,
//     CustomTaskItem,
//   ],
//   content : content,
//   onUpdate: ({editor}) =>{
//     onChange(id,editor.getJSON())
//   }
// })

//   useEffect(() => {
//     if (!editor ) {
//       return undefined
//     }
//     if(!content){
//       editor.chain().setContent(content).run()
//     }
//   }, [editor,initialValue,content])
//   return (
//     <EditorContent editor={editor} />
//   )
// }

// export default OptionComponent

