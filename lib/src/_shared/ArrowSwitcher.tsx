import * as React from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export interface ExportedArrowSwitcherProps {
  /** Left arrow icon */
  leftArrowIcon?: React.ReactNode;
  /** Right arrow icon */
  rightArrowIcon?: React.ReactNode;
  /** Left arrow icon aria-label text */
  leftArrowButtonText?: string;
  /** Right arrow icon aria-label text */
  rightArrowButtonText?: string;
  /**
   * Props to pass to left arrow button
   * @type {Partial<IconButtonProps>}
   */
  leftArrowButtonProps?: Partial<IconButtonProps>;
  /**
   * Props to pass to right arrow button
   * @type {Partial<IconButtonProps>}
   */
  rightArrowButtonProps?: Partial<IconButtonProps>;
}

interface ArrowSwitcherProps extends ExportedArrowSwitcherProps, React.HTMLProps<HTMLDivElement> {
  isLeftHidden?: boolean;
  isRightHidden?: boolean;
  isLeftDisabled: boolean;
  isRightDisabled: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
  text?: string;
}

export const useStyles = makeStyles(
  theme => ({
    iconButton: {
      zIndex: 1,
      backgroundColor: theme.palette.background.paper,
    },
    previousMonthButtonMargin: {
      marginRight: 24,
    },
    hidden: {
      visibility: 'hidden',
    },
  }),
  { name: 'MuiPickersArrowSwitcher' }
);

const PureArrowSwitcher: React.FC<ArrowSwitcherProps> = ({
  className,
  leftArrowButtonProps,
  leftArrowButtonText,
  rightArrowButtonProps,
  rightArrowButtonText,
  isLeftHidden,
  isRightHidden,
  isLeftDisabled,
  isRightDisabled,
  onLeftClick,
  onRightClick,
  leftArrowIcon = <ArrowLeftIcon />,
  rightArrowIcon = <ArrowRightIcon />,
  text,
  ...other
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  return (
    <div className={className} {...other}>
      <IconButton
        data-mui-test="previous-arrow-button"
        size="small"
        aria-label={leftArrowButtonText}
        {...leftArrowButtonProps}
        disabled={isLeftDisabled}
        onClick={onLeftClick}
        className={clsx(classes.iconButton, leftArrowButtonProps?.className, {
          [classes.hidden]: Boolean(isLeftHidden),
          [classes.previousMonthButtonMargin]: !Boolean(text),
        })}
      >
        {isRtl ? rightArrowIcon : leftArrowIcon}
      </IconButton>

      {text && (
        <Typography variant="subtitle1" display="inline">
          {text}
        </Typography>
      )}

      <IconButton
        data-mui-test="next-arrow-button"
        size="small"
        aria-label={rightArrowButtonText}
        {...rightArrowButtonProps}
        disabled={isRightDisabled}
        onClick={onRightClick}
        className={clsx(classes.iconButton, rightArrowButtonProps?.className, {
          [classes.hidden]: Boolean(isRightHidden),
        })}
      >
        {isRtl ? leftArrowIcon : rightArrowIcon}
      </IconButton>
    </div>
  );
};

PureArrowSwitcher.displayName = 'ArrowSwitcher';

export const ArrowSwitcher = React.memo(PureArrowSwitcher);
