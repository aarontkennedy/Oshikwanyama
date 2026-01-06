import "./ButtonWithTranslation.scss";

const ButtonWithTranslation = ({
  cta,
  translated,
  onClickHandler,
  disabled,
}: {
  cta: string;
  translated: string;
  onClickHandler: () => void;
  disabled?: boolean;
}): JSX.Element => (
  <button
    className="cta-button"
    onClick={onClickHandler}
    disabled={disabled || false}
  >
    <div className="cta-button__title">{cta}</div>
    <div className="cta-button__sub-title">{translated}</div>
  </button>
);

export default ButtonWithTranslation;
