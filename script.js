const quote = document.getElementById("quote");
        const author = document.getElementById("author");
        const newQuoteBtn = document.getElementById("newQuoteBtn");
        const tweetBtn = document.getElementById("tweetBtn");
        const api_url = "https://api.quotable.io/random?tags=motivational";

        const localQuotes = [
            { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
            { text: "Don't wait. The time will never be just right.", author: "Napoleon Hill" },
            { text: "Do today what others won't, so you can do tomorrow what others can't.", author: "Jerry Rice" },
            { text: "Your limits—like your fears—are often just an illusion.", author: "Michael Jordan" },
            { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
            { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
            { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
            { text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
            { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
            { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
            { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
            { text: "If you want to achieve greatness stop asking for permission.", author: "Anonymous" },
            { text: "Great things never come from comfort zones.", author: "Anonymous" }
        ];

        async function getQuote() {
            try {
                const response = await fetch(api_url);
                if (!response.ok) throw new Error('Quotable API error');
                const data = await response.json();
                quote.innerText = '"' + data.content + '"';
                author.innerText = "- " + data.author;
            } catch (err) {
                // Fallback la alt API
                try {
                    const response2 = await fetch('https://type.fit/api/quotes');
                    const quotes = await response2.json();
                    // Filtrare citate motivaționale (dacă există tag motivational în text)
                    const motivational = quotes.filter(q => q.text && q.text.toLowerCase().includes('motivat'));
                    const selected = motivational.length > 0 ? motivational[Math.floor(Math.random() * motivational.length)] : quotes[Math.floor(Math.random() * quotes.length)];
                    quote.innerText = '"' + selected.text + '"';
                    author.innerText = selected.author ? ("- " + selected.author) : "- Unknown";
                } catch {
                    // Fallback local
                    const selected = localQuotes[Math.floor(Math.random() * localQuotes.length)];
                    quote.innerText = '"' + selected.text + '"';
                    author.innerText = "- " + selected.author;
                }
            }
        }
        getQuote();

        newQuoteBtn.addEventListener("click", getQuote);
        tweetBtn.addEventListener("click", () => {
            const text = quote.innerText + " " + author.innerText;
            const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
            window.open(tweetUrl, "Tweet Window", "width=600,height=300");
        });
