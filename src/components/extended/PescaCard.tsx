import React, { PropsWithChildren } from 'react';

import CardBody from '@components/structure/card/CardBody';
import CardContainer from '@components/structure/card/CardContainer';
import CardHeader from '@components/structure/card/CardHeader';

type PescaCardProps = {
  header?: string;
};

export default function PescaCard({ header, children }: PropsWithChildren<PescaCardProps>) {
  return (
    <CardContainer>
      {header && <CardHeader header={header} />}
      <CardBody>{children}</CardBody>
    </CardContainer>
  );
}
