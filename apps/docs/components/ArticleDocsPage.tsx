import { Article } from '@/types/content-types'
import { getDb } from '@/utils/ContentDatabase'
import { ArticleDetails } from './ArticleDetails'
import { ArticleNavLinks } from './ArticleNavLinks'
import { Header } from './Header'
import { Mdx } from './Mdx'
import { Sidebar } from './Sidebar'
import { Image } from './mdx-components/generic'
import { Breadcrumb } from './Breadcrumb'

/** For articles with human-written content. */
export async function ArticleDocsPage({ article }: { article: Article & { isGenerated: false } }) {
	const db = await getDb()
	const section = await db.getSection(article.sectionId)
	const category = await db.getCategory(article.categoryId)
	const headings = await db.getArticleHeadings(article.id)
	const links = await db.getArticleLinks(article)
	const sidebar = await db.getSidebarContentList({
		sectionId: section.id,
		categoryId: category.id,
		articleId: article.id,
	})

	return (
		<>
			<Header sectionId={section.id} />
			<Sidebar headings={headings} {...sidebar} />
			<main className={`article`}>
				<div className="page-header">
					<Breadcrumb section={section} category={category} />
					<h1>{article.title}</h1>
				</div>
				{article.hero && <Image alt="hero" title={article.title} src={`images/${article.hero}`} />}
				{article.content && <Mdx content={article.content} />}
				<ArticleDetails article={article} />
				{links && <ArticleNavLinks links={links} />}
			</main>
		</>
	)
}
