import clsx from 'clsx';
import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	onChange: (newState: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpened, setOpened] = useState<boolean>(false);
	const [newState, setNewState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleChange = (
		key: keyof ArticleStateType,
		value: OptionType
	): void => {
		setNewState({ ...newState, [key]: value });
	};

	useOutsideClickClose({
		isOpen: isOpened,
		rootRef,
		onClose: () => setOpened(false),
		onChange: setOpened,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpened} onClick={() => setOpened(!isOpened)} />
			<aside
				className={clsx(styles.container, isOpened && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						props.onChange(newState);
					}}
					onReset={(e) => {
						e.preventDefault();
						setNewState(defaultArticleState);
					}}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={newState.fontFamilyOption}
						onChange={(option) => handleChange('fontFamilyOption', option)}
					/>
					<RadioGroup
						title='размер шрифта'
						name='font'
						selected={newState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => handleChange('fontSizeOption', option)}
					/>
					<Select
						title='цвет шрифта'
						selected={newState.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={newState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
					/>
					<Select
						title='ширина контента'
						selected={newState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setNewState(defaultArticleState);
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
