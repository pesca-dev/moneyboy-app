import { Container } from '@moneyboy/components/general/structure/Container';
import React, { PropsWithChildren } from 'react';

type ViewBaseProps = unknown;

export const ViewBase: React.FC<PropsWithChildren<ViewBaseProps>> = ({ children }) => <Container>{children}</Container>;
