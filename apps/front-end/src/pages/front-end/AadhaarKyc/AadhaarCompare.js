import { FrontEndTypo, IconByName, ImageView } from "@shiksha/common-lib";
import { Alert, HStack, VStack, Image, Box } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

export default function AadharCompare({ type, aadhaarCompare }) {
  const { t } = useTranslation();
  const [data, setData] = React.useState([]);
  const [isVerified, setIsVerified] = React.useState(true);

  React.useEffect(() => {
    const newData = aadhaarCompare?.data || [];
    setData(newData);
    let verData = {};
    newData.forEach((e) => {
      if (e?.arr) {
        verData = {
          ...verData,
          [e.arr]: e?.isVerified === false,
        };
      }
    });
    setIsVerified(aadhaarCompare?.isVerified);
  }, []);

  return (
    <VStack>
      <Alert status={isVerified ? "success" : "error"} my="4">
        <VStack space={2} flexShrink={1}>
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <FrontEndTypo.H4>
                {type === "upload"
                  ? isVerified
                    ? t("YOUR_AADHAAR_UPLOAD_SUCCESSFUL")
                    : t("YOUR_AADHAAR_UPLOAD_FAILED")
                  : isVerified
                  ? t("AADHAAR_VERIFICATION_SUCCESSFUL")
                  : t("AADHAR_KYC_VERIFICATION_FAILED")}
              </FrontEndTypo.H4>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
      <FrontEndTypo.H1 bold mt="4" color="textMaroonColor.400">
        {t("OFFLINE_AADHAAR_VERIFICATION")}
        (OKYC)
      </FrontEndTypo.H1>
      <VStack
        mt="4"
        space={"2"}
        bg="white"
        shadow="FooterShadow"
        borderRadius="10"
      >
        {data?.map((item, index) =>
          item.name === "PHOTO" ? (
            <HStack
              key={item}
              px="4"
              py="2"
              justifyContent={item?.aadhaar ? "" : "center"}
            >
              <Box w="120" h="120" flex="1" display={["none", "unset"]} />
              <VStack space="1" flex="1">
                <FrontEndTypo.H3>{t("PROFILE_DETAILS")}</FrontEndTypo.H3>
                <HStack flexWrap={"wrap"} space="2">
                  {item?.user ? (
                    item?.user?.map((e) => (
                      <HStack pt="2" key={e}>
                        <ImageView
                          w="60"
                          h="60"
                          source={{ document_id: e }}
                          alt="user photo"
                        />
                      </HStack>
                    ))
                  ) : (
                    <IconByName
                      isDisabled
                      name="AccountCircleLineIcon"
                      color="iconColor.350"
                      _icon={{ size: "120" }}
                      justifySelf="Center"
                    />
                  )}
                </HStack>
              </VStack>
              {item?.aadhaar && (
                <VStack space="1" flex="1">
                  <FrontEndTypo.H3>{t("AADHAAR_DETAILS")}</FrontEndTypo.H3>
                  <Image
                    rounded={"full"}
                    w="120"
                    h="120"
                    source={{
                      uri: `data:image/jpeg;charset=utf-8;base64,${item?.aadhaar}`,
                    }}
                    alt="aadhaar photo"
                  />
                </VStack>
              )}
            </HStack>
          ) : (
            <VStack key={item}>
              {index === 1 && (
                <HStack key={item} px="4" flex="1" py="2" space={2}>
                  <FrontEndTypo.H3 flex="1">{t("TITLE")} </FrontEndTypo.H3>
                  <FrontEndTypo.H3 flex="1">
                    {t("PROFILE_DETAILS")}
                  </FrontEndTypo.H3>
                  <FrontEndTypo.H3 flex="1">
                    {t("AADHAAR_DETAILS")}
                  </FrontEndTypo.H3>
                </HStack>
              )}
              <HStack
                key={item}
                px="4"
                flex="1"
                py="2"
                bg={item?.isVerified === false ? "red.300" : ""}
                space={2}
              >
                <FrontEndTypo.H3 flex="1">{t(item?.name)} </FrontEndTypo.H3>
                <FrontEndTypo.H3 flex="1">{item?.user} </FrontEndTypo.H3>
                <FrontEndTypo.H3 flex="1">{item?.aadhaar} </FrontEndTypo.H3>
              </HStack>
            </VStack>
          )
        )}
      </VStack>
    </VStack>
  );
}
