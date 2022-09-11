import type { NextPage } from 'next'
import React, { useState } from 'react'
import {
  createConnectTransport,
  createPromiseClient,
} from '@bufbuild/connect-web'
import { ChatService } from '../schemas/v1/chat_connectweb'
import { ChartHistory, ChatRequest, ChatResponse } from '../schemas/v1/chat_pb'

const Home: NextPage = () => {
  const [name, setName] = useState<string>('')
  const [completed, setCompleted] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [messages, setMessage] = useState<ChartHistory['data']>([])

  const client = createPromiseClient(
    ChatService,
    createConnectTransport({
      baseUrl: 'http://localhost:8080',
    })
  )
  const send = async () => {
    const res = await client.send({
      groupName: 'my-chat',
      userName: name,
      text: text,
    })
    if (res.ok) {
      setText('')
      window.scrollTo(0, document.body.scrollHeight)
    }
  }
  const handleSend = () => {
    send()
  }
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      send()
    }
  }

  const read = async (name: string) => {
    for await (const res of client.read({
      userName: name,
      groupName: 'my-chat',
    })) {
      setMessage((r) => [...r, res])
    }
  }
  const handleSubmit = () => {
    read(name)
    setCompleted(true)
  }

  if (!completed) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="p-8 shadow-lg rounded-xl text-center bg-white">
            <h3 className="text-1xl font-semibold text-gray-500">
              Type your name!
            </h3>
            <div className="text-left pt-3">
              <input
                type="text"
                placeholder="your name"
                onChange={(e) => setName(e.target.value)}
                className="p-1 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:border-2 border-cyan-500"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-cyan-200 p-2 pr-5 pl-5 text-gray-800 font-semibold rounded-xl border-cyan-700 focus:ring-2 m-4"
            >
              Chat start
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className=" h-full px-20 py-4 mb-16 overflow-y-auto">
      {messages.map((m) => {
        return (
          <div
            className={`w-full m-auto flex flex-end  ${
              m.userName === name ? 'justify-end' : ''
            }`}
          >
            <div className="w-2/5 pb-4">
              <div className="">
                <p
                  className={`font-semibold ml-3 text-sm text-slate-600 ${
                    m.userName === name ? 'text-right' : ''
                  }`}
                >
                  {m.userName} {m.userName === name ? '(me)' : ''}
                </p>
              </div>
              <div
                className={`mt-3 w-full p-4 rounded-b-xl bg-slate-100 ${
                  m.userName === name ? ' rounded-tl-xl' : ' rounded-tr-xl'
                }`}
              >
                <p className="text-sm text-slate-500">{m.text}</p>
              </div>
            </div>
          </div>
        )
      })}

      <div className=" fixed inset-x-0 bottom-0 z-10 bg-white shadow">
        <div className="flex my-4 w-3/4 mx-auto">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full block px-3 mr-10 outline-none placeholder:text-slate-400 bg-slate-50 rounded"
            placeholder="Type your message"
          />
          <div className="flex items-center space-x-4 bg-slate-500"></div>
          <button
            className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
