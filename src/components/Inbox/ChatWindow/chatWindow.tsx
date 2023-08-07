import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../../store/hooks';
import { IMessage, getConnection, setMessages } from '../../../store/slices/connectionSlice';
import Message from '../Message/message';
import { useDispatch } from 'react-redux';
import React, { useEffect, useMemo, useRef } from 'react';

export interface IChatWindow {
  toggledUser: string;
  setToggledUser: React.Dispatch<React.SetStateAction<string>>;
}

const ChatWindow: React.FC<IChatWindow> = (props) => {
  const dispatch = useDispatch();
  const ref: React.RefObject<HTMLDivElement> = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    // watch
    // formState: { errors },
  } = useForm<{ input: string }>();
  const onSubmit: SubmitHandler<{ input: string }> = async (data) => {
    if (!data.input) return;
    try {
      const message: IMessage = {
        username: connection.userName as string,
        message: data.input,
      };
      let response;
      if (props.toggledUser === 'public') {
        response = await connection.connectionInstance?.invoke('BroadcastChat', message);
      } else {
        response = await connection.connectionInstance?.invoke('SendChatToUser', props.toggledUser, message);
        if (response && props.toggledUser !== connection.userName) {
          dispatch(setMessages({ target: props.toggledUser, message }));
        }
        console.log('invoked message status: ', response);
        console.log('message params', message, props.toggledUser);
      }
    } catch (err) {
      console.log('err', err);
    }

    reset();
  };
  const connection = useAppSelector(getConnection);
  const messages = useMemo(() => connection.messages[props.toggledUser] ?? [], [connection.messages, props.toggledUser]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <div className="w-full h-[92vh] px-5 flex flex-col justify-between">
        <div className="flex flex-col mt-5 overflow-y-auto">
          {messages.map((message, index) => (
            <Message key={`${message.username}-${index}`} {...message} {...props} />
          ))}
          <div ref={ref} />
        </div>
        <div className="py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="chat" className="sr-only">
              Your message
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50">
              <textarea
                {...register('input')}
                rows={1}
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your message..."
                onKeyDown={(e) => {
                  if (e.code === 'Enter') {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                  }
                }}
              />
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
              >
                <svg
                  className="w-5 h-5 rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
