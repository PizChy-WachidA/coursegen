import {
  Heading,
  Box,
  ListItem,
  Text,
  UnorderedList,
  OrderedList,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  useColorModeValue,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  CourseContentContext,
  useCourseContent,
} from "../../context/CourseContentContext";
import { useContext, useEffect } from "react";

const CourseContentSection = () => {
  const { activeSection } = useContext(CourseContentContext);
  // const { activeSection } = useCourseContent();
  const headerBg = useColorModeValue("blue.300", "blue.300");
  const headerTextColor = useColorModeValue("white", "blackAlpha.800");
  let { content } = activeSection || {};

  if (typeof content === "string") {
    content = JSON.parse(content);
  }

  return activeSection && activeSection.content ? (
    <Box pt={2} px={[10, 30]} mb={8} overflow="auto">
      <Box>
        {content.map((content: any, i: number) => (
          <Box key={i} mb={8}>
            <Box
              bg={headerBg}
              color={headerTextColor}
              p={5}
              borderRadius="5px"
              display="inline-block"
            >
              <Heading size={["2xl"]}>{content.header}</Heading>
            </Box>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // @ts-ignore
                h1: ({ node, ...props }) => (
                  <Heading my={3} {...props} as="h1" />
                ),
                h2: ({ node, ...props }) => (
                  <Heading my={3} {...props} as="h2" size="lg" />
                ),
                h3: ({ node, ...props }) => (
                  <Heading my={3} {...props} as="h3" size="md" />
                ),
                p: ({ node, ...props }) => <Text my={2} {...props} />,
                ul: ({ node, ...props }) => <UnorderedList {...props} />,
                ol: ({ node, ...props }) => <OrderedList {...props} />,
                li: ({ node, ...props }) => <ListItem {...props} />,
                table: ({ node, ...props }) => (
                  <TableContainer>
                    <Table {...props} />
                  </TableContainer>
                ),
                thead: ({ node, ...props }) => <Thead {...props} />,
                tbody: ({ node, ...props }) => <Tbody {...props} />,
                tfoot: ({ node, ...props }) => <Tfoot {...props} />,
                tr: ({ node, ...props }) => <Tr {...props} />,
                th: ({ node, ...props }) => <Th {...props} />,
                td: ({ node, ...props }) => <Td {...props} />,
                caption: ({ node, ...props }) => <TableCaption {...props} />,
              }}
            >
              {content.text}
            </ReactMarkdown>
          </Box>
        ))}
      </Box>
    </Box>
  ) : null;
};

export default CourseContentSection;
