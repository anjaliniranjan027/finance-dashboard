import { Box, useMediaQuery } from '@mui/material';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';
import { useState } from 'react';
import MagnifyModal from '@/components/MagnifyModal';

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const handleBoxClick = (component: React.ReactNode) => {
    setModalContent(component);
    setModalOpen(true);
  };

  return (
    <>
      <Box width="100%" height="100%" display="grid" gap="1.5rem"
        sx={isAboveMediumScreens ? {
          gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
          gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
          gridTemplateAreas: gridTemplateLargeScreens,
        } : {
          gridAutoColumns: "1fr",
          gridAutoRows: "80px",
          gridTemplateAreas: gridTemplateSmallScreens,
        }}
      >
        <Row1 onBoxClick={handleBoxClick} />
        <Row2 onBoxClick={handleBoxClick} />
        <Row3 onBoxClick={handleBoxClick} />
      </Box>
      <MagnifyModal open={modalOpen} onClose={() => setModalOpen(false)}>
        {modalContent}
      </MagnifyModal>
    </>
  );
};

export default Dashboard;