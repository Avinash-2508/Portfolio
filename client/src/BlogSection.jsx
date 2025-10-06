import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const blogPosts = [
	{
		title: 'How I Built My Portfolio with React & Tailwind',
		date: '2025-09-01',
		summary:
			'A step-by-step guide to building a modern, animated portfolio using React, TailwindCSS, and Framer Motion.',
		content: `Every developer, at some point, wants a space that reflects their skills, projects, and personality. For me, that space was my portfolio website. I wanted something more than just a static page—I wanted it to feel alive, interactive, and truly mine. That’s when I decided to build it using React and Tailwind CSS.

<h3>Why React & Tailwind?</h3>

When I first planned my portfolio, I knew I didn’t want to spend weeks fiddling with plain HTML and CSS. React gave me the flexibility of reusable components and smooth navigation, while Tailwind made designing fast, consistent, and responsive.

Together, they felt like the perfect stack—React for the logic, Tailwind for the looks.

The Sections That Define Me

I wanted my portfolio to be simple yet complete. So I added:

About – where I introduce myself.

Projects – showcasing my work with descriptions and links.

Contact – making it easy for people to reach out.

Animations – subtle transitions and hover effects to make the site feel alive.

Dark Mode – because who doesn’t love a sleek dark theme?

Fun Easter Eggs – hidden surprises for anyone who interacts a little longer. (For example, if you hover on my name, something cool happens 😉).

The Challenges I Faced

Like any project, it wasn’t smooth sailing. Some of the biggest hurdles I faced were:

Responsive Design – making sure it looked good on both desktops and mobiles.

Animations – balancing smooth effects without overloading the site.

Routing – handling page navigation with React Router so everything felt seamless.

Each of these challenges taught me something new about web development and pushed me to dig deeper into best practices.

My Favorite Parts ✨

Some features I’m especially proud of are:

Interactive Animations & Hover Effects – adding personality to the site.

My Signature – a small but personal touch.

Easter Eggs – little hidden animations that make people smile when they find them.

These details may seem small, but they make the portfolio feel like me.

Deployment & Going Live 🚀

Once I was happy with the design, I deployed it on Netlify. The process was surprisingly smooth—just connect the GitHub repo, and Netlify takes care of the rest. Within minutes, my portfolio was live for the world to see.

What I Learned

This project wasn’t just about building a website—it was about:

Writing cleaner, reusable React components.

Understanding the power of utility-first CSS with Tailwind.

Improving problem-solving when facing design or routing issues.

Adding personality to a project through small creative touches.

Most importantly, I learned how fun it is to build something that truly represents me.

Final Thoughts

Building this portfolio was a mix of creativity, problem-solving, and storytelling through code. It’s more than just a website—it’s my journey, my skills, and a way to connect with recruiters, product-based companies, and freelance clients.

And this is just the beginning. As I learn and grow, so will my portfolio.`,

	},
	{
		title: 'Understanding Framer Motion for Smooth UI',
		date: '2025-08-15',
		summary: 'Tips and tricks for creating beautiful, smooth animations in your React projects.',
		content: `Framer Motion is a powerful animation library for React.\n\n**Why use Framer Motion?**\n- Simple API for complex animations\n- Supports gestures, layout, and shared element transitions\n- Integrates well with React\n\n**Sample Animation:**\n\`jsx\n<motion.button whileHover={{ scale: 1.1 }}>Hover me!</motion.button>\n\`\n\n**Advanced Tips:**\n- Use \`layout\` prop for shared layout transitions\n- Combine \`AnimatePresence\` for exit animations\n- Fine-tune with spring configs for natural feel\n\n**Common Pitfalls:**\n- Overusing animations can hurt UX\n- Test on mobile for performance\n\n**Resources:**\n- [Framer Motion Examples](https://www.framer.com/motion/examples/)`,
	},
	{
		title: 'My Favorite VS Code Extensions for Productivity',
		date: '2025-07-30',
		summary: 'A curated list of extensions that help me code faster and smarter every day.',
		content: `Here are some VS Code extensions I can't live without:\n\n- **Prettier**: Code formatter\n- **ESLint**: Linting for JavaScript/TypeScript\n- **Tailwind CSS IntelliSense**: Autocomplete for Tailwind classes\n- **GitLens**: Git superpowers\n- **Bracket Pair Colorizer**: Colorful brackets\n- **Path Intellisense**: Autocomplete file paths\n- **Thunder Client**: Lightweight API testing\n\n**How to Install:**\n1. Open Extensions sidebar (Ctrl+Shift+X)\n2. Search for the extension name\n3. Click Install\n\n**Pro Tip:**\nKeep your extensions updated and disable ones you don't use for best performance.`,
	},

];

const BlogSection = () => {
	const [openIndex, setOpenIndex] = useState(null);

	return (
		<motion.section
			id="blogs"
			className="py-20 bg-gradient-to-b from-transparent to-gray-50 dark:to-black"
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.8, ease: 'easeInOut' }}
		>
			<div className="max-w-5xl px-6 mx-auto">
				<h2 className="mb-8 text-4xl font-bold text-center text-gray-900 dark:text-white">
					Blogs
				</h2>
				<div className="grid gap-8 md:grid-cols-3">
					{blogPosts.map((post, idx) => (
						<motion.div
							key={idx}
							className="block p-6 transition-shadow duration-300 bg-white border border-gray-100 shadow-lg cursor-pointer rounded-xl dark:bg-gray-900 hover:shadow-2xl group dark:border-gray-800"
							whileHover={{ y: -8, scale: 1.03 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => setOpenIndex(idx)}
						>
							<div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
								{post.date}
							</div>
							<div className="mb-2 text-xl font-semibold text-gray-900 transition-colors duration-200 dark:text-white group-hover:text-orange-600">
								{post.title}
							</div>
							<div className="text-sm text-gray-700 dark:text-gray-300">
								{post.summary}
							</div>
						</motion.div>
					))}
				</div>

				<AnimatePresence>
					{openIndex !== null && (
						<motion.div
							className="fixed inset-0 z-50 flex items-center justify-center px-2 bg-black/60 backdrop-blur-sm"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setOpenIndex(null)}
							style={{ touchAction: 'manipulation' }}
						>
							<motion.div
								className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full p-4 sm:p-8 relative max-h-[90vh] overflow-y-auto custom-scrollbar"
								initial={{ scale: 0.9, y: 40, opacity: 0 }}
								animate={{ scale: 1, y: 0, opacity: 1 }}
								exit={{ scale: 0.9, y: 40, opacity: 0 }}
								transition={{ type: 'spring', stiffness: 120, damping: 18 }}
								onClick={e => e.stopPropagation()}
							>
								<button
									className="absolute z-10 p-1 text-2xl text-gray-400 transition-colors rounded-full top-2 right-2 sm:top-4 sm:right-4 hover:text-orange-500 bg-white/80 dark:bg-gray-900/80 sm:p-2"
									onClick={() => setOpenIndex(null)}
									aria-label="Close blog post"
									style={{ touchAction: 'manipulation' }}
								>
									&times;
								</button>
								<div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
									{blogPosts[openIndex].date}
								</div>
								<div className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
									{blogPosts[openIndex].title}
								</div>
								<div className="leading-relaxed text-gray-700 whitespace-pre-line dark:text-gray-200">
									{blogPosts[openIndex].content}
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.section>
	);
};

export default BlogSection;
