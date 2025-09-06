import { CSSProperties, useState } from 'react';
import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from 'src/styles/index.module.scss';

const App = () => {
	const [newState, setNewState] =
		useState<ArticleStateType>(defaultArticleState);

	function onChange(newState: ArticleStateType): void {
		setNewState(newState);
	}

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': newState.fontFamilyOption.value,
					'--font-size': newState.fontSizeOption.value,
					'--font-color': newState.fontColor.value,
					'--container-width': newState.contentWidth.value,
					'--bg-color': newState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onChange={(newState: ArticleStateType) => {
					onChange(newState);
				}}
			/>
			<Article />
		</main>
	);
};

export default App;
