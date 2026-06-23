import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

function AIMedicalAssistant() {

    const [message, setMessage] =
        useState("");

    const [chatHistory, setChatHistory] =
        useState([
            {
                role: "assistant",
                text: "Hello 👋 I'm your AI Medical Assistant. How can I help you today?"
            }
        ]);

    const fetchAIResponse = async (
        userMessage
    ) => {

        return new Promise((resolve) => {

            setTimeout(() => {

                resolve(
                    `Based on your symptoms "${userMessage}", please consult a pharmacist or doctor. Common OTC medicines may help depending on the condition.

⚠ Medical Disclaimer:
This advice is informational only and not a replacement for professional medical consultation.`
                );

            }, 1000);

        });
    };

    const handleSend = async () => {

        if (!message.trim()) return;

        const userMsg = {
            role: "user",
            text: message
        };

        setChatHistory(prev => [
            ...prev,
            userMsg
        ]);

        const currentMessage = message;

        setMessage("");

        const aiResponse =
            await fetchAIResponse(
                currentMessage
            );

        setChatHistory(prev => [
            ...prev,
            {
                role: "assistant",
                text: aiResponse
            }
        ]);
    };

    return (

        <div className="bg-white rounded-2xl shadow-md flex flex-col h-[450px]">

            <div className="p-4 border-b">

                <h2 className="font-bold text-xl">
                    AI Medical Assistant
                </h2>

            </div>

            {/* CHAT HISTORY */}

            <div
                className="
                flex-1
                overflow-y-auto
                p-4
                space-y-3
                "
            >

                {
                    chatHistory.map(
                        (chat, index) => (

                            <div
                                key={index}
                                className={`flex ${
                                    chat.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >

                                <div
                                    className={`
                                    max-w-[80%]
                                    px-4
                                    py-3
                                    rounded-2xl
                                    ${
                                        chat.role === "user"
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100"
                                    }
                                    `}
                                >

                                    {chat.text}

                                </div>

                            </div>
                        )
                    )
                }

            </div>

            {/* INPUT */}

            <div
                className="
                border-t
                p-3
                flex
                gap-2
                "
            >

                <input
                    type="text"
                    value={message}
                    onChange={(e) =>
                        setMessage(
                            e.target.value
                        )
                    }
                    placeholder="Ask me anything (e.g., 'I have a fever, what should I take?')..."
                    className="
                    flex-1
                    border
                    rounded-xl
                    px-4
                    py-3
                    "
                />

                <button
                    onClick={handleSend}
                    className="
                    bg-blue-600
                    text-white
                    px-4
                    rounded-xl
                    "
                >

                    <FaPaperPlane />

                </button>

            </div>

        </div>
    );
}

export default AIMedicalAssistant;