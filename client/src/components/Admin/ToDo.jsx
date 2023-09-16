import React, { useRef } from 'react';
import ContentEditable from 'react-contenteditable';

const ToDo = ({ id, html, updatePage, addBlock, deleteBlock }) => {
  const contentEditable = useRef(null);

  const onContentEditableChange = (e) => {
    updatePage({
      id: id,
      html: e.target.value,
    });
  };

  const onKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      }
      e.preventDefault();
      addBlock({
        id: id,
        ref: contentEditable.current,
      });
    } else if (e.key === 'Backspace' && !html) {
      e.preventDefault();
      deleteBlock({
        id: id,
        ref: contentEditable.current,
      });
    }
  };

  return (
    <ContentEditable
      style={{ padding: '5px' }}
      className="Block"
      innerRef={contentEditable}
      html={html}
      tagName={'p'}
      onChange={(e) => onContentEditableChange(e)}
      onKeyDown={(e) => onKeyDownHandler(e)}
    />
  );
};

export default ToDo;
