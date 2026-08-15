"use client";

import styled from "styled-components";

type ScareBarProps = {
  rating: number;
};

type SegmentProps = {
  $active: boolean;
};

const Container = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
`;

const Segment = styled.div<SegmentProps>`
  height: 4px;
  width: 16px;
  border-radius: 2px;
  background-color: ${(props) => (props.$active ? "#40B7FF" : "#2a2a2a")};
  transition: background-color 0.2s ease;
`;

export default function ScareBar({ rating }: ScareBarProps) {
  return (
    <Container>
      {Array.from({ length: 5 }, (_, i) => (
        <Segment key={i} $active={i < rating} />
      ))}
    </Container>
  );
}
