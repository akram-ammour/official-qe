// import React, { useState, useEffect,useRef } from 'react';
// import { ToDo } from '../components';

// const uid = () => {
//   return Date.now().toString(36) + Math.random().toString(36).substr(2);
// };

// const initialBlock = { id: uid(), html: '', tag: 'p' };

// const setCaretToEnd = (element) => {
//   // Create a new range
//   const range = document.createRange();
//   // Get the selection object
//   const selection = window.getSelection();
//   // Select all the content from the contenteditable element
//   range.selectNodeContents(element);
//   // Collapse it to the end, i.e. putting the cursor to the end
//   range.collapse(false);
//   // Clear all existing selections
//   selection.removeAllRanges();
//   // Put the new range in place
//   selection.addRange(range);
//   // Set the focus to the contenteditable element
//   element.focus();
// };
// const Empty = () => {
//     const [page, setPage] = useState({
//       blocks: [{ id: uid(), html: '' }]
//     });
  
//     const todoRefs = useRef([]);
  
//     const updatePageHandler = (updatedBlock, index) => {
//       const updatedBlocks = [...page.blocks];
//       updatedBlocks[index] = {
//         ...updatedBlocks[index],
//         html: updatedBlock.html
//       };
//       setPage({ blocks: updatedBlocks });
//     };
  
//     const addBlockHandler = (currentBlock, index) => {
//       const newBlock = { id: uid(), html: '' };
//       const updatedBlocks = [...page.blocks];
//       updatedBlocks.splice(index + 1, 0, newBlock);
//       setPage({ blocks: updatedBlocks }, () => {
//         const lastBlockRef = todoRefs.current[todoRefs.current.length - 1];
//         lastBlockRef.current.focus();
//       });
//     };
  
//     const deleteBlockHandler = (currentBlock, index) => {
//       const previousBlock = currentBlock.ref.previousElementSibling;
//       if (previousBlock) {
//         const updatedBlocks = [...page.blocks];
//         updatedBlocks.splice(index, 1);
//         setPage({ blocks: updatedBlocks }, () => {
//           const previousBlockRef = todoRefs.current[index - 1];
//           previousBlockRef.current.focus();
//         });
//       }
//     };
  
//     return (
//       <div className="Page">
//         {page.blocks.map((block, index) => {
//           const ref = useRef(null);
//           todoRefs.current[index] = ref;
//           return (
//             <ToDo
//               key={block.id}
//               id={block.id}
//               html={block.html}
//               ref={ref}
//               updatePage={(e) => updatePageHandler(e, index)}
//               addBlock={(e) => addBlockHandler(e, index)}
//               deleteBlock={(e) => deleteBlockHandler(e, index)}
//             />
//           );
//         })}
//       </div>
//     );
//   };
  
//   export default Empty;