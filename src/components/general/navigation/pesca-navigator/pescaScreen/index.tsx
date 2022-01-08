import { PescaNavContextType } from '@moneyboy/api/PescaNavContextType';
import { PescaNavContext } from '@moneyboy/components/general/navigation/pesca-navigator/createPescaNavigation';
import { animated, useSpring } from '@react-spring/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutAnimation, StyleSheet, View } from 'react-native';

type PescaScreenProps = {
  name: string;
  component: React.ComponentType<any>;
};

export type ScreenComponentProps<P = any, N = any> = {
  navigation: PescaNavContextType<N>;
  name: string;
  params?: P;
};

/**
 * Create a new screen for pesca navigation, which can be provided as a child for the PescaNavigator.
 * @param PescaNavContext
 */
export const createPescaScreen =
  (): React.FC<PescaScreenProps> =>
  ({ name, component }: PescaScreenProps) => {
    const navContext = useContext(PescaNavContext) as PescaNavContextType;

    // register this screen
    useEffect(() => {
      navContext.register(name);
    }, [navContext, name]);

    // index of this screen in the list of screens
    const [index, setIndex] = useState(navContext.screens.map(s => s.name).indexOf(name));
    useEffect(() => {
      setIndex(navContext.screens.map(s => s.name).indexOf(name));
    }, [navContext.screens, name]);

    // flag for indicating animation, so a blank screen will be rendered during animation
    const [isAnimating, setAnimating] = useState(false);

    // flag for indicating, if this screen is currently part of the view flow or positioned absolute
    const [inViewFlow, setInViewFlow] = useState(index === navContext.current);

    // flag for indicating, if this screen is currently rendered or not
    const [isFlex, setFlex] = useState(index === navContext.current);

    // update visibility, if index of this screen changes
    useEffect(() => {
      setInViewFlow(index === navContext.current);
      setFlex(index === navContext.current);
    }, [index, navContext]);

    // ref to the "last" current screen, so we can check, if an actual animation happened
    const curRef = useRef(navContext.current);

    // style for rendering the offset and opacity of this screen
    const [offsetStyle, setOffsetStyle] = useSpring(() => ({
      left: `-${navContext.current * 100}%`,
      opacity: 1,
    }));

    // animate the appearance and disappearance of screens
    useEffect(() => {
      // flag for inidcating, if this screen is the new screen
      const isCurrent = index === navContext.current;

      // did an animation happen?
      if (curRef.current !== navContext.current) {
        // if we are the current screen, make us visible, so we can animate in
        if (isCurrent) {
          setInViewFlow(true);
          setFlex(true);
        }
        setAnimating(true);

        LayoutAnimation.easeInEaseOut();
        // start animation for opacity and offset
        setOffsetStyle.start({
          from: {
            opacity: isCurrent ? 0 : 1,
          },
          to: {
            left: `-${navContext.current * 100}%`,
            opacity: isCurrent ? 1 : 0,
          },
          onResolve() {
            // after finishing animation update reference to "last current"
            setAnimating(false);
            curRef.current = navContext.current;

            // if we are not the current screen, make us invisible
            if (!isCurrent) {
              setFlex(false);
            }
          },
        });

        // if we are not the current screen, remove from view flow
        if (!isCurrent) {
          setInViewFlow(false);
        }
      }
    }, [index, navContext, setOffsetStyle]);

    const style = StyleSheet.create({
      screenWrapper: {
        flexDirection: 'row',
        width: '100%',
      },
      dummyWrapper: {
        display: isFlex ? 'flex' : 'none',
        position: inViewFlow ? 'relative' : 'absolute',
        width: '100%',
      },
    });

    const componentProps: ScreenComponentProps = {
      name,
      navigation: navContext,
      params: navContext.screens[index]?.params,
    };
    return (
      <animated.View style={[style.screenWrapper, offsetStyle]}>
        <View style={style.dummyWrapper} pointerEvents={isAnimating ? 'none' : 'auto'}>
          {React.createElement(component, componentProps)}
        </View>
      </animated.View>
    );
  };
