import { Container } from '@moneyboy/components/general/structure/container';
import React, { PropsWithChildren } from 'react';

type ViewBaseProps = unknown;

export const ViewBase: React.FC<PropsWithChildren<ViewBaseProps>> = ({ children }) => <Container>{children}</Container>;
