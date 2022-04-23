import { CenterButton } from '@moneyboy/components/general/navigation/CenterButton';
import { PescaTabIcon } from '@moneyboy/components/general/navigation/PescaTabIcon';
import { useStyle } from '@moneyboy/hooks/useStyle';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Route } from '@react-navigation/native';
import { animated, useSpring } from '@react-spring/native';
import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';
import { usePescaTabBarStyles } from './PescaTabBar.style';

type PescaTabUIProps = BottomTabBarProps;

const AnimatedSvg = animated(Svg);
const AnimatedPath = animated(Path);

/**
 * Custom tab bar for being used in react-anative-navigation.
 */
export const PescaTabBar: React.FC<PescaTabUIProps> = ({ navigation, state }) => {
  const [isOpen, setOpen] = useState(false);

  // Split tabs depending on their index
  const leftTabs = state.routes.filter((_, index) => index < state.routes.length / 2);
  const rightTabs = state.routes.filter((_, index) => index >= state.routes.length / 2);

  /**
   * Helper function for rendering a tab.
   */
  function renderTab(route: Route<string, any>) {
    return (
      <PescaTabIcon
        key={`route-${route.name}`}
        name={route.name}
        icon={route.params?.icon}
        navigation={navigation}
        focussed={state.index === state.routeNames.indexOf(route.name)}
        disabled={!!route.params?.disabled}
      />
    );
  }

  const { Footers } = useStyle();
  const { left, right } = useSafeAreaInsets();
  const styles = usePescaTabBarStyles();
  const width = Dimensions.get('screen').width - left - right;
  const centerButtonWidth = 28;
  const rectWidth = width / 2 - 20;

  const leftPaths = useMemo(
    () => [
      `m ${rectWidth - centerButtonWidth * 2 - 20} 0 
      q 0 0 27 0 
      q 20 0 20 10 
      q 0 29 29 28 
      v 26 h -76 v -64`,
      `m ${rectWidth - centerButtonWidth * 2 - 20} 0 
      q 0 0 27 0 
      q 20 0 20 0 
      q 0 0 29 0 
      v 64 h -76 v -64`,
    ],
    [rectWidth],
  );

  const rightPaths = useMemo(
    () => [
      `m ${rectWidth - centerButtonWidth * 2 - 20 + 76} 38 
      v 26 h 76 v -64 
      q 0 0 -27 0 
      q -20 0 -20 10 
      q 0 29 -29 28`,
      `m ${rectWidth - centerButtonWidth * 2 - 20 + 76} 38 
      v 26 h 76 v -64 
      q 0 0 -27 0 
      q -20 0 -20 0 
      q 0 0 -29 0`,
    ],
    [rectWidth],
  );

  const [{ d }, setD] = useSpring(() => ({
    d: 0,
    config: {
      tension: 250,
      friction: 30,
      mass: 4,
    },
  }));

  useEffect(() => {
    setD.start({ to: { d: isOpen ? 1 : 0 } });
  }, [isOpen, setD]);

  return (
    <>
      <SafeAreaView>
        <View style={[styles.footerWrapper]}>
          <View style={[styles.footer]}>
            <View style={[styles.tabBarWrapper]}>
              <AnimatedSvg height="64" width="100%">
                <Rect
                  x="0"
                  y="0"
                  rx="20"
                  width={`${rectWidth - centerButtonWidth * 2}`}
                  height="64"
                  fill={Footers.background}
                />
                <Rect
                  x={`${rectWidth + centerButtonWidth * 2}`}
                  y="0"
                  rx="20"
                  width={`${rectWidth - centerButtonWidth * 2}`}
                  height="64"
                  fill={Footers.background}
                />
                <AnimatedPath
                  d={d.to({
                    range: [0, 1],
                    output: leftPaths,
                  })}
                  fill={Footers.background}
                  // eslint-disable-next-line react/no-children-prop
                  children={<></>}
                />
                <AnimatedPath
                  d={d.to({
                    range: [0, 1],
                    output: rightPaths,
                  })}
                  fill={Footers.background}
                  // eslint-disable-next-line react/no-children-prop
                  children={<></>}
                />
              </AnimatedSvg>
            </View>
            <View style={styles.tabBarContainer}>
              <View style={styles.tabContainer}>{leftTabs.map(tab => renderTab(tab))}</View>
              <CenterButton setOpen={setOpen} isOpen={isOpen} />
              <View style={styles.tabContainer}>{rightTabs.map(tab => renderTab(tab))}</View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
