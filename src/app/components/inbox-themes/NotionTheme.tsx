import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  Avatar,
  HStack,
  Link,
  Icon,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { FiArchive } from "react-icons/fi";
import { FaRegCheckSquare } from "react-icons/fa";
import { PiNotificationFill } from "react-icons/pi";
import { FiSearch, FiHome, FiInbox, FiSettings, FiChevronDown } from "react-icons/fi";
import { BsFillFileTextFill, BsTrash } from "react-icons/bs";
import { AiOutlineCalendar, AiOutlineCheck } from "react-icons/ai";

import { GrDocumentText } from "react-icons/gr";
import { FaUserFriends } from "react-icons/fa";
import { Inbox, Notification, Notifications } from "@novu/react";
import { NotionIcon } from "../icons/Notion";
import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useInitialNotifications } from "../../hooks/useInitialNotifications";

const NotionTheme = ({ subscriberId }: { subscriberId: string | null }) => {
  const { selectedTheme } = useTheme();
  const borderColor = useColorModeValue("gray.200", "gray.700");
  useInitialNotifications();

  return (
    <Flex
      width="100%"
      height="100%"
      borderRadius="lg"
      bg="white"
      style={{
        fontFamily:
          'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      {/* Sidebar */}
      <Box
        width={{ base: "100%", md: "240px" }}
        bg="rgb(247, 247, 245)"
        boxShadow="lg"
        padding={"8px"}
        display="flex"
        flexDirection="column"
        borderColor={borderColor}
      >
        <Flex alignItems="center" mb={"4px"}>
          <Text fontSize="14px" fontWeight="bold" color="rgb(55, 53, 47)">
            <Icon
              as={NotionIcon}
              sx={{
                width: "18px",
                height: "18px",
                marginRight: "4px",
                paddingLeft: "4px",
                display: "inline-block",
              }}
              color="#37352F"
            />{" "}
            Notion Workspace
          </Text>
          <IconButton
            aria-label="User Settings"
            icon={<FiChevronDown />}
            variant="ghost"
            size="sm"
          />
        </Flex>

        <VStack align="stretch" spacing={0} mb={"15px"}>
          <SidebarItem icon={FiSearch} label="Search" />
          <SidebarItem icon={FiHome} label="Home" />
          <SidebarItem icon={FiInbox} label="Inbox" isActive />
          <SidebarItem icon={FiSettings} label="Settings & members" />
        </VStack>

        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>
          Favorites
        </Text>
        <VStack align="stretch" spacing={2} mb={"15px"}>
          <SidebarItem icon={FiHome} label="Teamspaces" />
          <SidebarItem icon={BsFillFileTextFill} label="Shared" />
        </VStack>

        <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2}>
          Private
        </Text>
        <VStack align="stretch" spacing={2} mb={"15px"}>
          <SidebarItem icon={AiOutlineCalendar} label="Calendar" />
          <SidebarItem icon={FaUserFriends} label="Templates" />
          <SidebarItem icon={BsTrash} label="Trash" />
        </VStack>
      </Box>

      {/* Main Content Area */}
      <Box
        flex="1"
        bg="white"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        p={0} // Responsive padding
      >
        <Box
          // bg="white"
          height="100%"
          overflowY="auto"
          maxW="390px"
          boxShadow={
            "rgba(15, 15, 15, 0.04) 0px 0px 0px 1px, rgba(15, 15, 15, 0.03) 0px 3px 6px, rgba(15, 15, 15, 0.06) 0px 9px 24px"
          }
        >
          {subscriberId && (
            <Inbox
              subscriberId={subscriberId as string}
              applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_CLIENT_APP_ID as string}
              appearance={selectedTheme?.appearance}
            >
              <Notifications
                renderNotification={(notification) => {
                  return <InboxItem notification={notification} />;
                }}
              />
            </Inbox>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

// Sidebar Item Component
interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  external?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isActive = false,
  external = false,
}) => {
  return (
    <HStack
      as={external ? Link : Box}
      spacing={3}
      p={2}
      fontWeight={"500"}
      borderRadius="6px"
      bg={isActive ? "rgba(0, 0, 0, 0.03)" : "transparent"}
      color={isActive ? "#1D1B16" : "rgba(55, 53, 47, 0.65)"}
      _hover={{ bg: "rgba(0, 0, 0, 0.03)", cursor: "pointer" }}
      sx={{
        height: "30px",
        padding: "4px 8px",
      }}
    >
      <Icon
        sx={{
          width: "14px",
          height: "14px",
        }}
        as={icon}
      />
      <Text fontSize="14px" color={isActive ? "#1D1B16" : "rgba(55, 53, 47, 0.65)"}>
        {label}
      </Text>
    </HStack>
  );
};

const InboxItem = ({ notification }: { notification: Notification }) => {
  const [isHovered, setIsHovered] = useState(false);
  const notificationType = notification.tags?.[0];

  return (
    <Box
      p={2}
      bg="white"
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex align="flex-start" position="relative">
        <VStack spacing={0} position="absolute" top="0" right="0">
          {isHovered && (
            <Box bg="white" display="flex" gap={1}>
              {notification.isRead ? (
                <IconButton
                  aria-label="Mark as unread"
                  icon={<PiNotificationFill />}
                  onClick={() => notification.unread()}
                  size="sm"
                  variant="ghost"
                />
              ) : (
                <IconButton
                  aria-label="Mark as read"
                  icon={<FaRegCheckSquare />}
                  onClick={() => notification.read()}
                  size="sm"
                  variant="ghost"
                />
              )}
              {notification.isArchived ? (
                <IconButton
                  aria-label="Unarchive"
                  icon={<PiNotificationFill />}
                  onClick={() => notification.unarchive()}
                  size="sm"
                  variant="ghost"
                />
              ) : (
                <IconButton
                  aria-label="Archive"
                  icon={<FiArchive />}
                  onClick={() => notification.archive()}
                  size="sm"
                  variant="ghost"
                />
              )}
            </Box>
          )}
        </VStack>
        {/* Conditionally render the avatar box only if there is an avatar */}

        <Box position="relative" display="flex" alignItems="center" mr="8px" height="26px">
          {!notification.isRead && (
            <Box>
              <Box width="8px" height="8px" bg="blue.500" borderRadius="full" />
            </Box>
          )}
          {notification.avatar !== undefined && (
            <Avatar
              width="24px"
              height="24px"
              marginLeft={"8px"}
              name={notification.to.firstName}
              src={notification.avatar || undefined}
            />
          )}
        </Box>

        {/* Main content with conditional margin based on avatar */}
        <VStack align="start" spacing={"8px"} flex="1" mt="3px">
          <Flex justify="space-between" width="100%">
            <Text fontSize="14px" color="gray.800" fontWeight="600">
              {notification.subject}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {formatTime(notification.createdAt)}
            </Text>
          </Flex>

          {notificationType !== "Mention" &&
            notificationType !== "Comment" &&
            notificationType !== "Invite" && (
              <Text fontSize="14px" color="gray.800">
                {notification.body}
              </Text>
            )}

          {(notificationType === "Mention" || notificationType === "Comment") && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<GrDocumentText />}
              _hover={{ bg: "rgba(0, 0, 0, 0.03)" }}
              pl="2px"
              pr="5px"
              height="25px"
            >
              <Text
                fontSize="14px"
                color="gray.800"
                fontWeight="500"
                backgroundImage="linear-gradient(to right, rgba(55, 53, 47, 0.16) 0%, rgba(55, 53, 47, 0.16) 100%)"
                backgroundRepeat={"repeat-x"}
                backgroundSize={"100% 1px"}
                backgroundPosition={"0 100%"}
                mr="-2px"
              >
                {notification.body}
              </Text>
            </Button>
          )}

          {notificationType === "Invite" && (
            <Button
              variant="outline"
              size="md"
              _hover={{ bg: "rgba(0, 0, 0, 0.03)" }}
              padding="12px"
              height="50px"
              fontSize={"14px"}
              width="100%"
              borderRadius="8px"
              textAlign={"left"}
              border="1px solid rgba(227, 226, 224, 0.5)"
              justifyContent={"space-between"}
            >
              {notification.body}
            </Button>
          )}

          {notificationType === "Comment" && (
            <Box>
              <Text fontSize="12px" color="rgb(120, 119, 116)" fontWeight="400">
                John Doe
              </Text>
              <Text fontSize="14px" color="rgb(55, 53, 47)" fontWeight="400">
                This is a notification Comment made by John Doe and posted on the page Top Secret
                Project
              </Text>
            </Box>
          )}

          <HStack spacing={3}>
            {notification.primaryAction && (
              <Button
                variant="outline"
                size="xs"
                colorScheme="gray"
                borderRadius="md"
                borderColor="gray.300"
                _hover={{ bg: "gray.100" }}
                paddingRight={"8px"}
                paddingLeft={"8px"}
                lineHeight={"26px"}
                height={"26px"}
              >
                {notification.primaryAction.label}
              </Button>
            )}
            {notification.secondaryAction && (
              <Button
                variant="ghost"
                size="xs"
                colorScheme="gray"
                borderRadius="md"
                borderColor="gray.300"
                _hover={{ bg: "gray.100" }}
                paddingRight={"8px"}
                paddingLeft={"8px"}
                lineHeight={"26px"}
                height={"26px"}
              >
                {notification.secondaryAction.label}
              </Button>
            )}
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

function formatTime(timestamp: any) {
  const date = new Date(timestamp);
  const now = new Date().getTime();
  const diffInSeconds = Math.floor((now - date.getTime()) / 1000);

  // Time calculations
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInWeek = secondsInDay * 7;
  const secondsInYear = secondsInDay * 365;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} seconds`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} minutes`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} hours`;
  } else if (diffInSeconds < secondsInWeek) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} days`;
  } else if (diffInSeconds < secondsInYear) {
    const options: any = { month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options); // e.g., "Feb 26"
  } else {
    return date.getFullYear().toString(); // e.g., "2022"
  }
}

export default NotionTheme;
