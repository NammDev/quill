import { Send } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

interface ChatInputProps {
  isDisabled?: boolean
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  return (
    <div className='absolute bottom-0 left-0 w-full'>
      <div className='flex flex-row gap-3 mx-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl'>
        <div className='relative flex items-stretch flex-1 h-full md:flex-col'>
          <div className='relative flex flex-col flex-grow w-full p-4'>
            <div className='relative'>
              <Textarea
                rows={1}
                maxRows={4}
                autoFocus
                placeholder='Enter your question...'
                className='py-3 pr-12 scrolling-touch text-base resize-none scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2'
                // ref={textareaRef}
                // onChange={handleInputChange}
                // value={message}
                // onKeyDown={(e) => {
                //   if (e.key === 'Enter' && !e.shiftKey) {
                //     e.preventDefault()
                //     addMessage()
                //     textareaRef.current?.focus()
                //   }
                // }}
              />

              <Button
                className='absolute bottom-1.5 right-[8px]'
                aria-label='send message'
                // disabled={isLoading || isDisabled}
                onClick={() => {
                  // addMessage()
                  // textareaRef.current?.focus()
                }}
              >
                <Send className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
