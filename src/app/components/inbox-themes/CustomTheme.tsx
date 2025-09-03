"use client";
import React, { useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Box, Flex, Text, useColorModeValue, useBreakpointValue, Stack } from "@chakra-ui/react";
import { Inbox } from "@novu/react";

const CustomTheme = ({ subscriberId }: { subscriberId: string | null }) => {
  const novuConfig: any = {
    applicationIdentifier: process.env.NEXT_PUBLIC_NOVU_CLIENT_APP_ID,
    subscriberId: subscriberId,
  };

  const { inboxThemeForm, selectedTheme } = useTheme();
  const formValues = inboxThemeForm.watch();

  useEffect(() => {
    const timer = setTimeout(() => {
      inboxThemeForm.setValue("open", true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [inboxThemeForm]);

  const appearanceVariables = {
    open: formValues.open,
    language: formValues.language,
    colorPrimary: formValues.colorPrimary,
    colorPrimaryForeground: formValues.colorPrimaryForeground,
    colorSecondary: formValues.colorSecondary,
    colorSecondaryForeground: formValues.colorSecondaryForeground,
    colorCounter: formValues.colorCounter,
    colorCounterForeground: formValues.colorCounterForeground,
    colorBackground: formValues.colorBackground,
    colorForeground: formValues.colorForeground,
    colorNeutral: formValues.colorNeutral,
    fontSize: formValues.fontSize,
    borderRadius: formValues.borderRadius,
  };

  return (
    <Flex
      width="100%"
      height="100%"
      minHeight="400px"
      padding="10px"
      borderRadius="lg"
      bg="white"
      style={{
        fontFamily:
          'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      {/* Main Content Area */}
      <Box width="100%">
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
        >
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              display="block"
              lineHeight={"40px"}
              fontWeight={"bold"}
              color={useColorModeValue("gray.800", "white")}
              position="relative"
            >
              Acme
            </Text>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
          {/* Inbox Component */}
          {subscriberId && (
            <Inbox
              open={appearanceVariables.open}
              applicationIdentifier={novuConfig.applicationIdentifier}
              subscriberId={novuConfig.subscriberId}
              placement={"bottom-end"}
              placementOffset={40}
              preferenceGroups={[
                {
                  name: "Account & Security",
                  filter: { tags: ["Account & Security"] },
                },
                {
                  name: "Transactions",
                  filter: { tags: ["Transactions"] },
                },
                {
                  name: "System Updates",
                  filter: { tags: ["System Updates"] },
                },
                {
                  name: "Promotions",
                  filter: { tags: ["Promotions"] },
                },
              ]}
              appearance={{
                variables: appearanceVariables,
                elements: {},
                icons: {},
              }}
            />
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

const NAV_ITEMS: Array<any> = [
  {
    label: "Home",
  },
  {
    label: "Tasks",
  },
  {
    label: "Items",
  },
  {
    label: "Settings",
  },
];

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} display="flex" alignItems="center">
          <Box
            as="a"
            p={2}
            href={navItem.href ?? "#"}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            lineHeight="18px"
            display="block"
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};
export default CustomTheme;
