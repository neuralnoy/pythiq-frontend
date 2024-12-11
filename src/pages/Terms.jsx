import { Link } from 'react-router-dom';
import NavBrand from '../components/nav/NavBrand';

const PrivacyAccordionItem = ({ title, children, id, isFirst }) => (
  <div className="collapse collapse-arrow join-item border-base-300 border">
    <input type="radio" name="privacy-accordion" defaultChecked={isFirst} />
    <div className="collapse-title text-xl font-medium">{title}</div>
    <div className="collapse-content prose max-w-none">
      {children}
    </div>
  </div>
);

const Terms = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-base-100/95 backdrop-blur-sm z-50">
        <div className="flex justify-between items-center p-2 sm:p-4 max-w-7xl mx-auto">
          <NavBrand />
          <Link to="/" className="btn btn-ghost btn-sm">
            Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        {/* Privacy Policy Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-600">Last updated {new Date().toLocaleDateString()}</p>
        </div>

        {/* Introduction and Key Points */}
        <div className="prose max-w-none mb-8">
          <p>
            This privacy notice for PythiQ ("Company," "we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:
          </p>
          <ul>
            <li>Visit our website, or any website of ours that links to this privacy notice</li>
            <li>Engage with us in other related ways, including any sales, marketing, or events</li>
          </ul>
        </div>

        {/* Key Points Summary */}
        <div className="bg-base-200 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">SUMMARY OF KEY POINTS</h2>
          <div className="prose max-w-none">
            <p className="italic mb-4">
              This summary provides key points from our privacy notice, but you can find out more details about any of these topics by using our table of contents below to find the section you are looking for.
            </p>
            <ul>
              <li><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with PythiQ and the Services, the choices you make, and the products and features you use.</li>
              <li><strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</li>
              {/* Add other key points */}
            </ul>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="join join-vertical w-full">
          <PrivacyAccordionItem 
            title="1. WHAT INFORMATION DO WE COLLECT?" 
            isFirst={true}
          >
            <h3>Personal information you disclose to us</h3>
            <p><em>In Short: We collect personal information that you provide to us.</em></p>
            <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
            
            <h4>Personal Information Provided by You</h4>
            <p>The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
            <ul>
              <li>names</li>
              <li>billing addresses</li>
              <li>email addresses</li>
            </ul>

            <h4>Sensitive Information</h4>
            <p>We do not process sensitive information.</p>

            <h4>Payment Data</h4>
            <p>We may collect data necessary to process your payment if you make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is stored by Stripe.</p>

            <h4>Social Media Login Data</h4>
            <p>We may provide you with the option to register with us using your existing social media account details. If you choose to register in this way, we will collect the information described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?"</p>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="2. HOW DO WE PROCESS YOUR INFORMATION?"
          >
            <p><em>In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</em></p>
            
            <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
            <ul>
              <li>To facilitate account creation and authentication and otherwise manage user accounts.</li>
              <li>To save or protect an individual's vital interest.</li>
            </ul>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?"
          >
            <p><em>In Short: We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</em></p>
            
            <h4>If you are located in the EU or UK, this section applies to you.</h4>
            <p>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>
            <ul>
              <li><strong>Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
              <li><strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations.</li>
              <li><strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party.</li>
            </ul>

            <h4>If you are located in Canada, this section applies to you.</h4>
            <p>We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent).</p>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?"
          >
            <p><em>In Short: We may share information in specific situations described in this section and/or with the following third parties.</em></p>
            
            <p>We may need to share your personal information in the following situations:</p>
            <ul>
              <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            </ul>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?"
          >
            <p><em>In Short: We may use cookies and other tracking technologies to collect and store your information.</em></p>
            
            <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?"
          >
            <p><em>In Short: If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</em></p>
            
            <p>Our Services offer you the ability to register and log in using your third-party social media account details. Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public.</p>
            
            <p>We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider.</p>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="7. HOW LONG DO WE KEEP YOUR INFORMATION?"
          >
            <p><em>In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</em></p>
            
            <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law. No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>
            
            <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="8. HOW DO WE KEEP YOUR INFORMATION SAFE?"
          >
            <p><em>In Short: We aim to protect your personal information through a system of organizational and technical security measures.</em></p>
            
            <p>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.</p>
            
            <p>Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="9. DO WE COLLECT INFORMATION FROM MINORS?"
          >
            <p><em>In Short: We do not knowingly collect data from or market to children under 18 years of age.</em></p>
            
            <p>We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records.</p>
            
            <p>If you become aware of any data we may have collected from children under age 18, please contact us at support@pythiq.ai.</p>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="10. WHAT ARE YOUR PRIVACY RIGHTS?"
          >
            <p><em>In Short: In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</em></p>
            
            <p>In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right:</p>
            <ul>
              <li>to request access and obtain a copy of your personal information</li>
              <li>to request rectification or erasure</li>
              <li>to restrict the processing of your personal information</li>
              <li>to data portability</li>
            </ul>

            <h4>Account Information</h4>
            <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
            <ul>
              <li>Log in to your account settings and update your user account.</li>
            </ul>

            <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="11. CONTROLS FOR DO-NOT-TRACK FEATURES"
          >
            <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized.</p>
            
            <p>As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</p>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="12. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?"
          >
            <p><em>In Short: Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</em></p>
            
            <p>California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes.</p>

            <h4 className="mt-6">CCPA Privacy Notice</h4>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Examples</th>
                    <th>Collected</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A. Identifiers</td>
                    <td>Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                    <td>YES</td>
                  </tr>
                  <tr>
                    <td>B. Personal information categories</td>
                    <td>Name, contact information, education, employment, employment history, and financial information</td>
                    <td>YES</td>
                  </tr>
                  <tr>
                    <td>C. Protected classification characteristics</td>
                    <td>Gender and date of birth</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>D. Commercial information</td>
                    <td>Transaction information, purchase history, financial details, and payment information</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>E. Biometric information</td>
                    <td>Fingerprints and voiceprints</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>F. Internet activity</td>
                    <td>Browsing history, search history, online behavior, interest data, and interactions with our and other websites</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>G. Geolocation data</td>
                    <td>Device location</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>H. Audio, electronic, visual, thermal, olfactory, or similar information</td>
                    <td>Images and audio, video or call recordings created in connection with our business activities</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>I. Professional or employment-related information</td>
                    <td>Business contact details in order to provide you our Services at a business level</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>J. Education Information</td>
                    <td>Student records and directory information</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>K. Inferences drawn</td>
                    <td>Inferences drawn from any of the collected personal information listed above</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>L. Sensitive Personal Information</td>
                    <td></td>
                    <td>NO</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="13. DO WE MAKE UPDATES TO THIS NOTICE?"
          >
            <p><em>In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>
            
            <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>
          </PrivacyAccordionItem>

          <PrivacyAccordionItem 
            title="14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"
          >
            <p>If you have questions or comments about this notice, you may email us at support@pythiq.ai or contact us by post:</p>
            
            <p className="mt-4">
              PythiQ<br />
              [Your Address]<br />
              [City, State, ZIP]<br />
              [Country]
            </p>
          </PrivacyAccordionItem>
        </div>

        {/* Terms of Service Section */}
        <div className="mt-16 mb-16">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          <div className="prose max-w-none mb-8">
            <h2>AGREEMENT TO OUR LEGAL TERMS</h2>
            <p>
              We are PythiQ ("Company," "we," "us," "our"). We operate the website pythiq.ai (the "Site"), 
              as well as any other related products and services that refer or link to these legal terms 
              (the "Legal Terms") (collectively, the "Services").
            </p>
          </div>
          
          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" defaultChecked /> 
              <div className="collapse-title text-xl font-medium">
                1. OUR SERVICES
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.
                </p>
                <p>
                  The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                2. INTELLECTUAL PROPERTY RIGHTS
              </div>
              <div className="collapse-content prose max-w-none">
                <h3>Our intellectual property</h3>
                <p>
                  We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").
                </p>
                
                <h3>Your use of our Services</h3>
                <p>
                  Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:
                </p>
                <ul>
                  <li>Access the Services; and</li>
                  <li>Download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use or internal business purpose.</li>
                </ul>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                3. USER REPRESENTATIONS
              </div>
              <div className="collapse-content prose max-w-none">
                <p>By using the Services, you represent and warrant that:</p>
                <ul>
                  <li>All registration information you submit will be true, accurate, current, and complete</li>
                  <li>You will maintain the accuracy of such information and promptly update such registration information as necessary</li>
                  <li>You have the legal capacity and you agree to comply with these Legal Terms</li>
                  <li>You are not under the age of 13</li>
                  <li>You are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services</li>
                  <li>You will not access the Services through automated or non-human means, whether through a bot, script, or otherwise</li>
                  <li>You will not use the Services for any illegal or unauthorized purpose</li>
                  <li>Your use of the Services will not violate any applicable law or regulation</li>
                </ul>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                4. USER REGISTRATION
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                5. PURCHASES AND PAYMENT
              </div>
              <div className="collapse-content prose max-w-none">
                <p>We accept the following forms of payment:</p>
                <ul>
                  <li>Visa</li>
                  <li>Mastercard</li>
                  <li>American Express</li>
                </ul>
                <p>
                  You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed.
                </p>
                <p>
                  Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in US dollars.
                </p>
                <p>
                  You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                6. CANCELLATION
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  All purchases are non-refundable. You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term.
                </p>
                <p>
                  If you are unsatisfied with our Services, please email us at support@pythiq.ai.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                7. PROHIBITED ACTIVITIES
              </div>
              <div className="collapse-content prose max-w-none">
                <p>You may not access or use the Services for any purpose other than that for which we make the Services available. As a user of the Services, you agree not to:</p>
                <ul>
                  <li>Upload, share, distribute, or otherwise use any PDF files for which you lack the necessary rights, permissions, or licenses.</li>
                  <li>Engage in any activity that constitutes academic dishonesty, including but not limited to cheating, plagiarism, or any other form of academic misconduct.</li>
                  <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                  <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                  <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
                  <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                  <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                  <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                  <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                  <li>Engage in unauthorized framing of or linking to the Services.</li>
                  <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other malicious code.</li>
                  <li>Use the Services in any automated manner without our express permission.</li>
                </ul>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                8. USER GENERATED CONTRIBUTIONS
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").
                </p>
                <p>When you create or make available any Contributions, you thereby represent and warrant that:</p>
                <ul>
                  <li>The creation, distribution, transmission, public display, or performance of your Contributions do not and will not infringe the proprietary rights of any third party.</li>
                  <li>Your Contributions are not false, inaccurate, or misleading.</li>
                  <li>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
                  <li>Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable.</li>
                </ul>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                9. CONTRIBUTION LICENSE
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions.
                </p>
                <p>
                  We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any Contributions; (2) to re-categorize any Contributions to place them in more appropriate locations on the Services; and (3) to pre-screen or delete any Contributions at any time and for any reason, without notice. We have no obligation to monitor your Contributions.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                10. SERVICES MANAGEMENT
              </div>
              <div className="collapse-content prose max-w-none">
                <p>We reserve the right, but not the obligation, to:</p>
                <ul>
                  <li>Monitor the Services for violations of these Legal Terms</li>
                  <li>Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms</li>
                  <li>Refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof</li>
                  <li>Remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems</li>
                  <li>Otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services</li>
                </ul>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                11. PRIVACY POLICY
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  We care about data privacy and security. Please review our Privacy Policy posted on the Services. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms.
                </p>
                <p>
                  Please be advised the Services are hosted in the United States. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the United States, then through your continued use of the Services, you are transferring your data to the United States, and you expressly consent to have your data transferred to and processed in the United States.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                12. COPYRIGHT INFRINGEMENTS
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us using the contact information provided below (a "Notification").
                </p>
                <p>
                  A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification. Please be advised that pursuant to applicable law you may be held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that material located on or linked to by the Services infringes your copyright, you should consider first contacting an attorney.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                13. TERM AND TERMINATION
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION.
                </p>
                <p>
                  If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                14. MODIFICATIONS AND INTERRUPTIONS
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
                </p>
                <p>
                  We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                15. GOVERNING LAW
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  These Legal Terms are governed by and interpreted following the laws of Germany, and the use of the United Nations Convention of Contracts for the International Sales of Goods is expressly excluded. If your habitual residence is in the EU, and you are a consumer, you additionally possess the protection provided to you by obligatory provisions of the law in your country to residence.
                </p>
                <p>
                  PythiQ and yourself both agree to submit to the non-exclusive jurisdiction of the courts of Germany, which means that you may make a claim to defend your consumer protection rights in regards to these Legal Terms in Germany, or in the EU country in which you reside.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                16. DISPUTE RESOLUTION
              </div>
              <div className="collapse-content prose max-w-none">
                <h3>Binding Arbitration</h3>
                <p>
                  Any dispute arising from the relationships between the Parties to these Legal Terms shall be determined by one arbitrator who will be chosen in accordance with the Arbitration and Internal Rules of the European Court of Arbitration being part of the European Centre of Arbitration having its seat in Strasbourg, and which are in force at the time the application for arbitration is filed, and of which adoption of this clause constitutes acceptance. The language of the proceedings shall be English. Applicable rules of substantive law shall be the law of Germany.
                </p>

                <h3>Restrictions</h3>
                <p>
                  The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.
                </p>

                <h3>Exceptions to Arbitration</h3>
                <p>
                  The Parties agree that the following Disputes are not subject to the above provisions concerning binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                17. CORRECTIONS
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                18. DISCLAIMER
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                19. LIMITATIONS OF LIABILITY
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>
                <p>
                  NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE ONE (1) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                20. INDEMNIFICATION
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                21. USER DATA
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services.
                </p>
                <p>
                  You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing.
                </p>
                <p>
                  YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                23. MISCELLANEOUS
              </div>
              <div className="collapse-content prose max-w-none">
                <p>
                  These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision.
                </p>
                <p>
                  These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="terms-accordion" />
              <div className="collapse-title text-xl font-medium">
                24. CONTACT US
              </div>
              <div className="collapse-content prose max-w-none">
                <p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>
                <p className="mt-4">
                  PythiQ<br />
                  support@pythiq.ai
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        <div>
          <p>© {new Date().getFullYear()} PythiQ - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Terms; 