/* eslint-disable jsx-a11y/label-has-associated-control */

import { Editor } from '@toast-ui/react-editor';
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import {
  BlueButton,
  CustomEditor,
  DefaultInput,
  EditHeader,
  EditSidebar,
  TagInput,
} from '../../components';
import { useInput } from '../../hooks';
import { editQuestion, useAppDispatch } from '../../redux';
import { question } from '../../utils';
import { ENG_REGEX } from '../../utils/regex';
import {
  ButtonsContainer,
  CancelButton,
  Container,
  EditorContainer,
  TagsContainer,
  TitleContainer,
} from './style';

const EditQuestion = () => {
  // question, answer 타입에 따라 input 다르게 수정
  const editorRef = useRef<Editor>(null);
  const [title, titleHandler] = useInput('Stop an array while finding string');
  const [body, setBody] = useState(question);
  const [tagInput, setTagInput] = useState('');
  const [tagArr, setTagArr] = useState(['javascript', 'react']);
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [tagError, setTagError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (title.trim().length > 14) {
        setTitleError(false);
      }
      titleHandler(e);
    },
    [titleHandler, title]
  );

  const handleEditorChange = useCallback(() => {
    if (
      editorRef.current &&
      editorRef.current?.getInstance().getMarkdown().length > 29
    ) {
      setBodyError(false);
    }
    if (editorRef.current) {
      setBody(editorRef.current?.getInstance().getMarkdown());
    }
  }, []);

  const handleTagInputOnKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      if (
        e.key === 'Enter' &&
        target.value.trim() !== '' &&
        !tagArr.includes(target.value)
      ) {
        setTagError(false);
        setTagArr((prev) => [...prev, target.value]);
        setTagInput('');
      }
    },
    [tagArr]
  );

  const handleTagInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (ENG_REGEX.test(value)) {
        setTagInput(value);
      }
    },
    []
  );

  const handleTagDelete = useCallback(
    (name: string) => {
      const deletedTags = tagArr.filter((tag) => tag !== name);
      setTagArr(deletedTags);
    },
    [tagArr]
  );

  const handleEditButtonClick = useCallback(() => {
    if (
      tagArr.length === 0 ||
      title.trim().length < 15 ||
      body.trim().length < 30
    ) {
      if (tagArr.length === 0) setTagError(true);
      if (title.length < 15) setTitleError(true);
      if (body.length < 29) setBodyError(true);
      return;
    }
    dispatch(
      editQuestion({
        title,
        body,
        tags: tagArr,
      })
    );
    navigate(-1);
  }, [title, body, tagArr, dispatch, navigate]);

  return (
    <Container>
      <EditHeader />
      <TitleContainer>
        <DefaultInput
          label="Title"
          id="title"
          placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          value={title}
          isError={titleError}
          onChange={handleTitleChange}
        />
      </TitleContainer>
      <EditorContainer>
        <h2>Body</h2>
        <CustomEditor
          value={body}
          editorRef={editorRef}
          isError={bodyError}
          onChange={handleEditorChange}
        />
      </EditorContainer>
      <TagsContainer>
        <TagInput
          value={tagInput}
          tagArr={tagArr}
          isError={tagError}
          placeholder="e.g. (angular sql-server string)"
          onChange={handleTagInputChange}
          onKeyUp={handleTagInputOnKeyUp}
          onClick={handleTagDelete}
        />
      </TagsContainer>
      <ButtonsContainer>
        <BlueButton width="90px" onClick={handleEditButtonClick}>
          Save Edits
        </BlueButton>
        <CancelButton onClick={() => navigate(-1)}>Cancel</CancelButton>
      </ButtonsContainer>
      <EditSidebar />
    </Container>
  );
};

export default EditQuestion;
