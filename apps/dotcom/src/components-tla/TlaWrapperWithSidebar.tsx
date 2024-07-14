import { ReactNode } from 'react'
import { useValue } from 'tldraw'
import { useApp } from '../hooks/useAppState'
import { TlaSidebar } from './TlaSidebar'

export function TlaWrapperWithSidebar({ children }: { children: ReactNode }) {
	const app = useApp()
	const theme = useValue('theme', () => app.getSessionState().theme, [app])
	return (
		<div
			className={`tla tla-layout tla-layout__signedin ${theme === 'light' ? 'tla-theme__light' : 'tla-theme__dark'}`}
			data-sidebar={true}
		>
			<TlaSidebar />
			{children}
		</div>
	)
}
