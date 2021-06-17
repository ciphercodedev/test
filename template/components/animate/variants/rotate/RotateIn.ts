// ----------------------------------------------------------------------

const TRANSITION_ENTER = {
   duration: 0.64,
   ease: [0.43, 0.13, 0.23, 0.96]
};
const TRANSITION_EXIT = {
   duration: 0.48,
   ease: [0.43, 0.13, 0.23, 0.96]
};

export const varRotateIn = {
   initial: { opacity: 0, rotate: -360 },
   animate: { opacity: 1, rotate: 0, transition: TRANSITION_ENTER },
   exit: { opacity: 0, rotate: -360, transition: TRANSITION_EXIT }
};
