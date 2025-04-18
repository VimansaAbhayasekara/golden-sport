"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Send, MessageCircle } from "lucide-react"

const FAQ = [
  {
    question: "What cricket bats do you recommend for beginners?",
    answer: "We recommend our SS-100 Beginner Cricket Bat for new players. It's lightweight (2.7 lbs), has a large sweet spot, and comes with a 6-month warranty. Priced at just $89.99, it's perfect for developing proper technique."
  },
  {
    question: "Do you sell cricket batting gloves in different sizes?",
    answer: "Yes! We carry batting gloves in sizes from Youth Small to Adult XXL. Our premium GS-Pro gloves feature reinforced palms, breathable mesh, and come in 3 color options. Sizing charts are available on each product page."
  },
  {
    question: "What's your return policy for cricket equipment?",
    answer: "We offer 30-day returns on unused cricket gear with original packaging. Bats must be returned unmarked. For hygiene reasons, gloves and protective gear can only be returned if tags are intact. Shipping costs are non-refundable."
  },
  {
    question: "How do I choose the right cricket ball?",
    answer: "For matches: Use our approved Grade A leather balls. For practice: Synthetic balls last longer. For beginners: Soft training balls are safest. We recommend the GS-Tournament ball for serious players - hand-stitched with a cork core for consistent performance."
  },
  {
    question: "Do you offer team discounts for bulk orders?",
    answer: "Absolutely! Orders over $1000 qualify for 15% off. Team packages include: 12 bats + 6 balls + kit bag for $1500 (normally $1760). Email teams@goldensports.com with your requirements for a custom quote."
  }
]

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean, isSuggestion?: boolean}>>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const showSuggestedQuestions = () => {
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Would you like to know about:", 
        isUser: false 
      }])
      
      FAQ.forEach((item, i) => {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: item.question,
            isUser: false,
            isSuggestion: true
          }])
        }, (i + 1) * 200)
      })
    }, 1000)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isUser: true }])
    setInputValue("")
    setIsTyping(true)
    
    // Simulate bot response after delay
    setTimeout(() => {
      const matchedQuestion = FAQ.find(q => 
        inputValue.toLowerCase().includes(q.question.toLowerCase().split(" ")[0]))
      
      if (matchedQuestion) {
        setMessages(prev => [...prev, { text: matchedQuestion.answer, isUser: false }])
      } else {
        setMessages(prev => [...prev, { 
          text: "Please wait while our support team responds to your question.", 
          isUser: false 
        }])
      }
      
      setIsTyping(false)
      showSuggestedQuestions()
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setMessages(prev => [...prev, { text: question, isUser: true }])
    setIsTyping(true)
    
    setTimeout(() => {
      const answer = FAQ.find(q => q.question === question)?.answer || 
        "I couldn't find an answer to that. Please contact support@goldensports.com for assistance."
      setMessages(prev => [...prev, { text: answer, isUser: false }])
      setIsTyping(false)
      showSuggestedQuestions()
    }, 1000)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 shadow-lg ${
          isMobile ? "rounded-full h-12 w-12 p-0" : "rounded-md"
        }`}
      >
        {isMobile ? <MessageCircle className="h-5 w-5" /> : "Start Chat"}
      </Button>

      {/* Chat Box */}
      {isOpen && (
  <Card className={`
    fixed bottom-24 right-8 flex flex-col z-50 shadow-xl
    w-[calc(100vw-2rem)] max-w-md
    h-[calc(100vh-10rem)] max-h-[600px]
    sm:w-[400px] sm:h-[500px]
    md:w-[450px] md:h-[550px]
    lg:w-[500px]
  `}>
    <CardHeader className="bg-primary p-4 rounded-t-lg">
      <div className="flex justify-between items-center">
        <CardTitle className="text-white">Golden Sports Support</CardTitle>
        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
          <X className="h-5 w-5" />
        </button>
      </div>
    </CardHeader>
    
    <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="space-y-2">
          <div className="bg-muted p-4 rounded-lg max-w-[80%]">
            <p>Hi there! How can we help you today with your cricket gear needs?</p>
          </div>
          <div className="bg-muted p-4 rounded-lg max-w-[80%]">
            <p>You can ask me about:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              {FAQ.map((item, i) => (
                <li 
                  key={i} 
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => handleQuickQuestion(item.question)}
                >
                  {item.question}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      {messages.map((msg, i) => (
        <div 
          key={i} 
          className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
        >
          <div 
            className={`p-4 rounded-lg max-w-[80%] ${
              msg.isUser 
                ? "bg-primary text-primary-foreground" 
                : msg.isSuggestion
                  ? "bg-muted/50 border border-primary/20 cursor-pointer hover:bg-muted/80"
                  : "bg-muted"
            }`}
            onClick={() => msg.isSuggestion && handleQuickQuestion(msg.text)}
          >
            {msg.text}
            {isTyping && !msg.isUser && !msg.isSuggestion && i === messages.length - 1 && (
              <span className="typing-dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            )}
          </div>
        </div>
      ))}
    </CardContent>

    {/* Input Area */}
    <div className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 rounded-full"
          disabled={isTyping}
        />
        <Button 
          onClick={handleSendMessage}
          className="rounded-full aspect-square p-2"
          disabled={isTyping}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        Tip: Try asking about bats, gloves, or returns
      </div>
    </div>
  </Card>
)}

      <style jsx>{`
        .typing-dots span {
          animation: blink 1.4s infinite both;
          opacity: 0;
        }
        .typing-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </>
  )
}