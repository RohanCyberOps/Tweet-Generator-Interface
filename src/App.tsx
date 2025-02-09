import React, { useState } from 'react';
import { Brain, Heart, Laugh, RefreshCw, Share2 } from 'lucide-react';

type TweetTone = 'humorous' | 'informative' | 'motivational';

interface ToneConfig {
  icon: React.ReactNode;
  emojis: string[];
  hashtags: string[];
  templates: string[];
}

const toneConfigs: Record<TweetTone, ToneConfig> = {
  humorous: {
    icon: <Laugh className="w-5 h-5" />,
    emojis: ['😂', '🤣', '😅', '😆', '🤪'],
    hashtags: ['#funny', '#humor', '#lol', '#jokes'],
    templates: [
      "Why did the {topic} cross the road? Because {topic} was trending! {emoji}",
      "Plot twist: {topic} is actually just {topic} in disguise {emoji}",
      "Me trying to understand {topic} be like... {emoji}"
    ]
  },
  informative: {
    icon: <Brain className="w-5 h-5" />,
    emojis: ['💡', '📚', '🤓', '🎯', '💭'],
    hashtags: ['#didyouknow', '#facts', '#learning', '#knowledge'],
    templates: [
      "Fun fact: {topic} is more fascinating than you think! Here's why... {emoji}",
      "3 things you didn't know about {topic}: Thread 🧵",
      "The science behind {topic} will blow your mind! {emoji}"
    ]
  },
  motivational: {
    icon: <Heart className="w-5 h-5" />,
    emojis: ['✨', '💪', '🔥', '⭐', '🌟'],
    hashtags: ['#motivation', '#inspiration', '#success', '#growth'],
    templates: [
      "Your {topic} journey starts with a single step. Make it count! {emoji}",
      "Don't let {topic} stop you from achieving greatness {emoji}",
      "Transform your {topic} into your strength {emoji}"
    ]
  }
};

function App() {
  const [tone, setTone] = useState<TweetTone>('humorous');
  const [topic, setTopic] = useState('');
  const [generatedTweet, setGeneratedTweet] = useState('');

  // Create matrix lines dynamically
  const matrixLines = Array.from({ length: 20 }, (_, i) => (
    <div key={`matrix-${i}`} className="matrix-line" />
  ));

  const generateTweet = () => {
    if (!topic) return;

    const config = toneConfigs[tone];
    const template = config.templates[Math.floor(Math.random() * config.templates.length)];
    const emoji = config.emojis[Math.floor(Math.random() * config.emojis.length)];
    const hashtags = config.hashtags
      .slice(0, 2)
      .concat([`#${topic.replace(/\s+/g, '')}`])
      .join(' ');

    const tweet = template
      .replace(/{topic}/g, topic)
      .replace(/{emoji}/g, emoji)
      + '\n\n'
      + hashtags;

    setGeneratedTweet(tweet);
  };

  const copyToClipboard = async () => {
    if (generatedTweet) {
      await navigator.clipboard.writeText(generatedTweet);
    }
  };

  return (
    <div className="min-h-screen animated-bg p-6">
      <div className="matrix-bg">
        {matrixLines}
        <div className="glow-orb"></div>
        <div className="glow-orb"></div>
        <div className="glow-orb"></div>
      </div>
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-gray-900/90 backdrop-blur-lg rounded-xl shadow-2xl shadow-cyan-500/10 p-8 border border-cyan-500/20 float-animation">
          <h1 className="text-3xl font-bold text-cyan-400 mb-6 fade-in">Tweet Generator ✨</h1>
          
          <div className="space-y-6">
            <div className="fade-in" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                Select Tone
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(Object.keys(toneConfigs) as TweetTone[]).map((t, index) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all button-animation ${
                      tone === t
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                        : 'border-gray-700 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-gray-300'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {toneConfigs[t].icon}
                    <span className="capitalize">{t}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="topic" className="block text-sm font-medium text-cyan-300 mb-2">
                Topic
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic..."
                className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-gray-100 placeholder-gray-500 input-animation"
              />
            </div>

            <button
              onClick={generateTweet}
              disabled={!topic}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 button-animation fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              <RefreshCw className="w-5 h-5" />
              Generate Tweet
            </button>

            {generatedTweet && (
              <div className="mt-6 fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="bg-gray-800/50 rounded-lg p-4 relative border border-gray-700 float-animation">
                  <p className="text-gray-100 whitespace-pre-wrap">{generatedTweet}</p>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-cyan-400 rounded-full hover:bg-gray-700/50 transition-colors button-animation"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {280 - generatedTweet.length} characters remaining
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;